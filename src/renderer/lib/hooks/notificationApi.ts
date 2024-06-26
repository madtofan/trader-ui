import { MutationOptions } from '.';
import { useMutation, useQuery } from 'react-query';
import { AddGroupEndpointRequest } from '@/bindings/notification/AddGroupEndpointRequest';
import { SendNotificationEndpointRequest } from '@/bindings/notification/SendNotificationEndpointRequest';
import notificationService from '@/lib/services/notificationService';

const useSendNotification = (token: string, options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['sendNotifcation'],
    mutationFn: (data: SendNotificationEndpointRequest) =>
      notificationService.sendNotification(data, token),
    ...options,
  });
};

const useGetNotifications = () => {
  return useQuery({
    queryKey: ['getNotifications'],
    queryFn: notificationService.getNotifications,
    retry: 0,
  });
};

const useGetNotificationLogs = (page: number) => {
  return useQuery({
    queryKey: ['getNotificationLogs', page],
    queryFn: notificationService.getNotificationLogs,
  });
};

const useSubscribeToGroup = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['subscribeToGroup'],
    mutationFn: ({ groupName }: { groupName: string }) =>
      notificationService.subscribeToGroup(groupName),
    ...options,
  });
};

const useUnsubscribeFromGroup = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['unsubscribeFromGroup'],
    mutationFn: ({ groupName }: { groupName: string }) =>
      notificationService.unsubscribeFromGroup(groupName),
    ...options,
  });
};

const useAddNotificationGroup = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['addNotificationGroup'],
    mutationFn: (data: AddGroupEndpointRequest) =>
      notificationService.addGroup(data),
    ...options,
  });
};

const useRemoveNotificationGroup = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: [['removeNotificationGroup']],
    mutationFn: ({
      groupName,
      adminEmail,
    }: {
      groupName: string;
      adminEmail: string;
    }) => notificationService.removeGroup(groupName, adminEmail),
    ...options,
  });
};

export {
  useSendNotification,
  useGetNotifications,
  useGetNotificationLogs,
  useSubscribeToGroup,
  useUnsubscribeFromGroup,
  useAddNotificationGroup,
  useRemoveNotificationGroup,
};
