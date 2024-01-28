import axios from "axios";
import { QueryClient, QueryFunctionContext } from "react-query";
import { EventSourcePolyfill } from "event-source-polyfill";
import { addNotificationGroupEndpoint, getNotificationsEndpoint, listNotificationEndpoint, removeNotificationGroupEndpoint, subscribeNotificationEndpoint } from "@/config/api";
import { SendNotificationEndpointRequest } from "@/bindings/notification/SendNotificationEndpointRequest";
import { NotificationEndpointResponse } from "@/bindings/notification/NotificationEndpointResponse";
import { NotificationLogsEndpointResponse } from "@/bindings/notification/NotificationLogsEndpointResponse";
import { AddGroupEndpointRequest } from "@/bindings/notification/AddGroupEndpointRequest";

class NotificationService {
  async sendNotification(data: SendNotificationEndpointRequest) {
    const res = await axios.post<NotificationEndpointResponse>(getNotificationsEndpoint(""), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }

  getNotifications(context: QueryFunctionContext) {
    // TODO - recheck this
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const { queryKey } = context;
    return new Promise((resolve, reject) => {
      const [_key] = queryKey;
      const queryClient = new QueryClient();
      let eventSource = new EventSourcePolyfill(getNotificationsEndpoint(token), {
        withCredentials: true,
        heartbeatTimeout: 60000, //Timeout
      });
      eventSource.addEventListener("SUCCESS", (e) => {
        const data = JSON.parse(e.target.data);
        if (e.target.lastEventId === "END") {
          queryClient.setQueryData([_key], data);
          eventSource.close();
          resolve(data); // Resolve promise with data
        } else {
          if (data) {
            queryClient.setQueryData([_key], data);
          }
        }
      });
      eventSource.addEventListener("error", (e) => {
        eventSource.close();
        reject(e); // Reject promise with error
      });
    });
  }

  async getNotificationLogs() {
    const res = axios.get<NotificationLogsEndpointResponse>(listNotificationEndpoint());
    return res;
  }

  async subscribeToGroup(groupName: string) {
    const res = await axios.get<NotificationEndpointResponse>(subscribeNotificationEndpoint(groupName));
    return res;
  }

  async unsubscribeFromGroup(groupName: string) {
    const res = await axios.delete<NotificationEndpointResponse>(subscribeNotificationEndpoint(groupName));
    return res;
  }

  async addGroup(data: AddGroupEndpointRequest) {
    const res = await axios.post<NotificationEndpointResponse>(addNotificationGroupEndpoint(), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }

  async removeGroup(groupName: string, adminEmail: string) {
    const res = await axios.delete<NotificationEndpointResponse>(removeNotificationGroupEndpoint(groupName, adminEmail));
    return res;
  }
}

export default new NotificationService();
