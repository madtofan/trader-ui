import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { QueryClient, QueryFunctionContext } from 'react-query';
import {
  addNotificationGroupEndpoint,
  getNotificationsEndpoint,
  listNotificationEndpoint,
  removeNotificationGroupEndpoint,
  subscribeNotificationEndpoint,
} from '@/lib/config/api';
import { SendNotificationEndpointRequest } from '@/bindings/notification/SendNotificationEndpointRequest';
import { NotificationEndpointResponse } from '@/bindings/notification/NotificationEndpointResponse';
import { NotificationLogsEndpointResponse } from '@/bindings/notification/NotificationLogsEndpointResponse';
import { AddGroupEndpointRequest } from '@/bindings/notification/AddGroupEndpointRequest';
import { initializeAxiosClient } from '.';

const axiosClient = initializeAxiosClient();

class NotificationService {
  addNotificationGroupEndpoint: () => string;

  getNotificationsEndpoint: (bearerToken: string) => string;

  listNotificationEndpoint: () => string;

  removeNotificationGroupEndpoint: (
    groupName: string,
    adminEmail: string,
  ) => string;

  subscribeNotificationEndpoint: (groupName: string) => string;

  constructor() {
    this.addNotificationGroupEndpoint = addNotificationGroupEndpoint;
    this.getNotificationsEndpoint = getNotificationsEndpoint;
    this.listNotificationEndpoint = listNotificationEndpoint;
    this.removeNotificationGroupEndpoint = removeNotificationGroupEndpoint;
    this.subscribeNotificationEndpoint = subscribeNotificationEndpoint;
  }

  async sendNotification(data: SendNotificationEndpointRequest, token: string) {
    const res = await axios.post<NotificationEndpointResponse>(
      this.getNotificationsEndpoint(''),
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );
    return res;
  }

  getNotifications(context: QueryFunctionContext) {
    const token = localStorage.getItem('bearerToken') || 'invalidToken';
    const { queryKey } = context;
    return new Promise((resolve, reject) => {
      const [__key] = queryKey;
      const queryClient = new QueryClient();
      const eventSource = new EventSourcePolyfill(
        this.getNotificationsEndpoint(encodeURI(token)),
        {
          withCredentials: true,
          heartbeatTimeout: 60000, // Timeout
        },
      );
      eventSource.addEventListener('SUCCESS', (e) => {
        const data = JSON.parse(e.target.data);
        if (e.target.lastEventId === 'END') {
          queryClient.setQueryData([__key], data);
          eventSource.close();
          resolve(data); // Resolve promise with data
        } else if (data) {
          queryClient.setQueryData([__key], data);
        }
      });
      eventSource.addEventListener('error', (e) => {
        eventSource.close();
        reject(e); // Reject promise with error
      });
    });
  }

  async getNotificationLogs({
    queryKey,
  }: QueryFunctionContext<[string, number | null | undefined]>) {
    const [_, page] = queryKey;
    const res = await axiosClient.get<NotificationLogsEndpointResponse>(
      `${this.listNotificationEndpoint()}?page=${page ?? 0}`,
    );
    return res;
  }

  async subscribeToGroup(groupName: string) {
    const res = await axiosClient.get<NotificationEndpointResponse>(
      this.subscribeNotificationEndpoint(groupName),
    );
    return res;
  }

  async unsubscribeFromGroup(groupName: string) {
    const res = await axiosClient.delete<NotificationEndpointResponse>(
      this.subscribeNotificationEndpoint(groupName),
    );
    return res;
  }

  async addGroup(data: AddGroupEndpointRequest) {
    const res = await axiosClient.post<NotificationEndpointResponse>(
      this.addNotificationGroupEndpoint(),
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    return res;
  }

  async removeGroup(groupName: string, adminEmail: string) {
    const res = await axiosClient.delete<NotificationEndpointResponse>(
      this.removeNotificationGroupEndpoint(groupName, adminEmail),
    );
    return res;
  }
}

export default new NotificationService();
