/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { initializeAxiosClient } from '.';
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

const axiosClient = initializeAxiosClient();

class NotificationService {
  async sendNotification(data: SendNotificationEndpointRequest, token: string) {
    const res = await axios.post<NotificationEndpointResponse>(
      getNotificationsEndpoint(''),
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
      const [_key] = queryKey;
      const queryClient = new QueryClient();
      const eventSource = new EventSourcePolyfill(
        getNotificationsEndpoint(encodeURI(token)),
        {
          withCredentials: true,
          heartbeatTimeout: 60000, // Timeout
        },
      );
      eventSource.addEventListener('SUCCESS', (e) => {
        const data = JSON.parse(e.target.data);
        if (e.target.lastEventId === 'END') {
          queryClient.setQueryData([_key], data);
          eventSource.close();
          resolve(data); // Resolve promise with data
        } else if (data) {
          queryClient.setQueryData([_key], data);
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
      `${listNotificationEndpoint()}?page=${page ?? 0}`,
    );
    return res;
  }

  async subscribeToGroup(groupName: string) {
    const res = await axiosClient.get<NotificationEndpointResponse>(
      subscribeNotificationEndpoint(groupName),
    );
    return res;
  }

  async unsubscribeFromGroup(groupName: string) {
    const res = await axiosClient.delete<NotificationEndpointResponse>(
      subscribeNotificationEndpoint(groupName),
    );
    return res;
  }

  async addGroup(data: AddGroupEndpointRequest) {
    const res = await axiosClient.post<NotificationEndpointResponse>(
      addNotificationGroupEndpoint(),
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    return res;
  }

  async removeGroup(groupName: string, adminEmail: string) {
    const res = await axiosClient.delete<NotificationEndpointResponse>(
      removeNotificationGroupEndpoint(groupName, adminEmail),
    );
    return res;
  }
}

export default new NotificationService();
