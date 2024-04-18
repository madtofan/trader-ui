import userService from '@/services/userService';
import { useQuery, useMutation } from 'react-query';
import { RegisterEndpointRequest } from '@/bindings/user/RegisterEndpointRequest';
import { UpdateEndpointRequest } from '@/bindings/user/UpdateEndpointRequest';
import { LoginEndpointRequest } from '@/bindings/user/LoginEndpointRequest';
import { AddRolePermissionRequest } from '@/bindings/user/AddRolePermissionRequest';
import { AuthorizeRevokeUserRoleRequest } from '@/bindings/user/AuthorizeRevokeUserRoleRequest';
import { AuthorizeRevokeRolePermissionRequest } from '@/bindings/user/AuthorizeRevokeRolePermissionRequest';
import { MutationOptions } from '.';

const useCurrentUser = () => {
  return useQuery(['currentUser'], () => {
    return userService.getCurrentUser();
  });
};

const useRegisterUser = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['registerUser'],
    mutationFn: (data: RegisterEndpointRequest) =>
      userService.registerUser(data),
    ...options,
  });
};

const useUpdateUser = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: (data: UpdateEndpointRequest) => userService.updateUser(data),
    ...options,
  });
};

const useLogin = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginEndpointRequest) => userService.login(data),
    ...options,
  });
};

const useVerifyRegistration = (token: string) => {
  return useQuery(['verifyRegistration'], () => {
    return userService.verifyRegistration(token);
  });
};

const useGetUsers = (page: number) => {
  return useQuery({
    queryKey: ['getUsers', page],
    queryFn: userService.getUsers,
  });
};

const useGetRoles = (page: number) => {
  return useQuery({
    queryKey: ['getRoles', page],
    queryFn: userService.getRoles,
  });
};

const useAddRole = (
  data: AddRolePermissionRequest,
  options?: MutationOptions,
) => {
  return useMutation({
    mutationKey: ['addRole'],
    mutationFn: () => userService.addRole(data),
    ...options,
  });
};

const useDeleteRole = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['deleteRole'],
    mutationFn: ({ roleName }: { roleName: string }) =>
      userService.deleteRole(roleName),
    ...options,
  });
};

const useGetPermissions = (page: number) => {
  return useQuery({
    queryKey: ['getPermissions', page],
    queryFn: userService.getPermissions,
  });
};

const useAddPermission = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['addPermission'],
    mutationFn: (data: AddRolePermissionRequest) =>
      userService.addPermission(data),
    ...options,
  });
};

const useDeletePermission = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['deletePermission'],
    mutationFn: ({ permissionName }: { permissionName: string }) =>
      userService.deletePermission(permissionName),
    ...options,
  });
};

const useAuthorizeUser = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['authorizeUser'],
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: AuthorizeRevokeUserRoleRequest;
    }) => userService.authorizeUser(userId, data),
    ...options,
  });
};

const useRevokeUser = (
  userId: string,
  data: AuthorizeRevokeUserRoleRequest,
  options?: MutationOptions,
) => {
  return useMutation({
    mutationKey: ['revokeUser'],
    mutationFn: () => userService.authorizeUser(userId, data),
    ...options,
  });
};

const useAuthorizeRole = (
  userId: string,
  data: AuthorizeRevokeRolePermissionRequest,
  options?: MutationOptions,
) => {
  return useMutation({
    mutationKey: ['authorizeRole'],
    mutationFn: () => userService.authorizeRole(userId, data),
    ...options,
  });
};

const useRevokeRole = (
  userId: string,
  data: AuthorizeRevokeRolePermissionRequest,
  options?: MutationOptions,
) => {
  return useMutation({
    mutationKey: ['revokeRole'],
    mutationFn: () => userService.revokeRole(userId, data),
    ...options,
  });
};

export {
  useCurrentUser,
  useRegisterUser,
  useUpdateUser,
  useLogin,
  useVerifyRegistration,
  useGetUsers,
  useGetRoles,
  useAddRole,
  useDeleteRole,
  useGetPermissions,
  useAddPermission,
  useDeletePermission,
  useAuthorizeUser,
  useRevokeUser,
  useAuthorizeRole,
  useRevokeRole,
};
