import { AddGroupEndpointRequest } from "@/bindings/notification/AddGroupEndpointRequest";
import { SendNotificationEndpointRequest } from "@/bindings/notification/SendNotificationEndpointRequest";
import notificationService from "@/services/notificationService";
import { useMutation, useQuery } from "react-query";

type MutationOptions = Parameters<typeof useMutation>[2];

const useSendNotification = (data: SendNotificationEndpointRequest, options?: MutationOptions) => {
  return useMutation(
    ["sendNotifcation"],
    () => {
      return notificationService.sendNotification(data);
    },
    options,
  );
}

const useGetNotifications = () => {
  return useQuery({ queryKey: [["getNotifications"]], queryFn: notificationService.getNotifications, retry: 1 });
}

const useGetNotificationLogs = () => {
  return useQuery({ queryKey: [["getNotificationLogs"]], queryFn: notificationService.getNotificationLogs });
}

const useSubscribeToGroup = (groupName: string) => {
  return useMutation({ mutationKey: [["subscribeToGroup", groupName]], mutationFn: () => notificationService.subscribeToGroup(groupName) });
}

const useUnsubscribeFromGroup = (groupName: string) => {
  return useMutation({ mutationKey: [["unsubscribeFromGroup", groupName]], mutationFn: () => notificationService.unsubscribeFromGroup(groupName) });
}

const useAddNotificationGroup = (data: AddGroupEndpointRequest) => {
  return useMutation({ mutationKey: [["addNotificationGroup"]], mutationFn: () => notificationService.addGroup(data) });
}

const useRemoveNotificationGroup = (groupName: string, adminEmail: string) => {
  return useMutation({ mutationKey: [["removeNotificationGroup", groupName]], mutationFn: () => notificationService.removeGroup(groupName, adminEmail) });
}

export {
  useSendNotification,
  useGetNotifications,
  useGetNotificationLogs,
  useSubscribeToGroup,
  useUnsubscribeFromGroup,
  useAddNotificationGroup,
  useRemoveNotificationGroup
}
