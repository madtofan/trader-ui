import userService from "@/services/userService";
import { useQuery, useMutation } from "react-query";
import { RegisterEndpointRequest } from "@/bindings/user/RegisterEndpointRequest";
import { UpdateEndpointRequest } from "@/bindings/user/UpdateEndpointRequest";
import { LoginEndpointRequest } from "@/bindings/user/LoginEndpointRequest";
import { AddRolePermissionRequest } from "@/bindings/user/AddRolePermissionRequest";
import { AuthorizeRevokeUserRoleRequest } from "@/bindings/user/AuthorizeRevokeUserRoleRequest";
import { AuthorizeRevokeRolePermissionRequest } from "@/bindings/user/AuthorizeRevokeRolePermissionRequest";

const useCurrentUser = () => {
  return useQuery(["currentUser"], () => { return userService.getCurrentUser(); });
};

const useRegisterUser = (data: RegisterEndpointRequest, options?: any) => {
  return useMutation(
    () => {
      return userService.registerUser(data);
    },
    ...options,
  );
};

const useUpdateUser = (data: UpdateEndpointRequest, options?: any) => {
  return useMutation(
    () => {
      return userService.updateUser(data);
    },
    ...options,
  );
};

const useLogin = (data: LoginEndpointRequest, options?: any) => {
  return useMutation(
    () => {
      return userService.login(data);
    },
    ...options,
  );
};

const useRefreshToken = (data: LoginEndpointRequest, options?: any) => {
  return useMutation(
    () => {
      return userService.login(data);
    },
    ...options,
  );
};

const useVerifyRegistration = (token: string) => {
  return useQuery(["verifyRegistration"], () => { return userService.verifyRegistration(token); });
};

const useGetRoles = () => {
  return useQuery(["getRoles"], () => { return userService.getRoles(); });
};

const useAddRole = (data: AddRolePermissionRequest, options?: any) => {
  return useMutation(
    () => {
      return userService.addRole(data);
    },
    ...options,
  );
};

const useDeleteRole = (roleName: string, options?: any) => {
  return useMutation(
    () => {
      return userService.deleteRole(roleName);
    },
    ...options,
  );
};

const useGetPermissions = () => {
  return useQuery(["getPermissions"], () => { return userService.getPermissions(); });
};

const useAddPermission = (data: AddRolePermissionRequest, options?: any) => {
  return useMutation(
    () => {
      return userService.addPermission(data);
    },
    ...options,
  );
};

const useDeletePermission = (permissionName: string, options?: any) => {
  return useMutation(
    () => {
      return userService.deletePermission(permissionName);
    },
    ...options,
  );
};

const useAuthorizeUser = (userId: string, data: AuthorizeRevokeUserRoleRequest, options?: any) => {
  return useMutation(
    () => {
      return userService.authorizeUser(userId, data);
    },
    ...options,
  );
};

const useRevokeUser = (userId: string, data: AuthorizeRevokeUserRoleRequest, options?: any) => {
  return useMutation(
    () => {
      return userService.authorizeUser(userId, data);
    },
    ...options,
  );
};

const useAuthorizeRole = (userId: string, data: AuthorizeRevokeRolePermissionRequest, options?: any) => {
  return useMutation(
    () => {
      return userService.authorizeRole(userId, data);
    },
    ...options,
  );
};

const useRevokeRole = (userId: string, data: AuthorizeRevokeRolePermissionRequest, options?: any) => {
  return useMutation(
    () => {
      return userService.revokeRole(userId, data);
    },
    ...options,
  );
};

export {
  useCurrentUser,
  useRegisterUser,
  useUpdateUser,
  useLogin,
  useRefreshToken,
  useVerifyRegistration,
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
