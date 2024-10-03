import axios from 'axios';
import { CONTEXT_KEYS, STORE_CHANNELS } from '@/../shared-types';
import {
  authorizeRoleEndpoint,
  authorizeUserEndpoint,
  listUsersEndpoint,
  loginEndpoint,
  permissionEndpoint,
  permissionsEndpoint,
  revokeRoleEndpoint,
  revokeUserEndpoint,
  roleEndpoint,
  rolesEndpoint,
  userEndpoint,
  verifyEndpoint,
} from '@/lib/config/api';
import { RegisterEndpointRequest } from '@/bindings/user/RegisterEndpointRequest';
import { UpdateEndpointRequest } from '@/bindings/user/UpdateEndpointRequest';
import { LoginEndpointRequest } from '@/bindings/user/LoginEndpointRequest';
import { AddRolePermissionRequest } from '@/bindings/user/AddRolePermissionRequest';
import { AuthorizeRevokeUserRoleRequest } from '@/bindings/user/AuthorizeRevokeUserRoleRequest';
import { AuthorizeRevokeRolePermissionRequest } from '@/bindings/user/AuthorizeRevokeRolePermissionRequest';
import { UserEndpointResponse } from '@/bindings/user/UserEndpointResponse';
import { RegisterUserEndpointResponse } from '@/bindings/user/RegisterUserEndpointResponse';
import { ObtainTokenResponse } from '@/bindings/user/ObtainTokenResponse';
import { StatusMessageResponse } from '@/bindings/StatusMessageResponse';
import { RolesListResponse } from '@/bindings/user/RolesListResponse';
import { PermissionsListResponse } from '@/bindings/user/PermissionsListResponse';
import { UserListEndpointResponse } from '@/bindings/user/UserListEndpointResponse';
import { QueryFunctionContext } from 'react-query';
import { initializeAxiosClient } from '.';

const axiosClient = initializeAxiosClient();

class UserService {
  authorizeRoleEndpoint: (roleName: string) => string;

  authorizeUserEndpoint: (userId: string) => string;

  listUsersEndpoint: () => string;

  loginEndpoint: () => string;

  permissionEndpoint: (permissionName: string) => string;

  permissionsEndpoint: () => string;

  revokeRoleEndpoint: (roleName: string) => string;

  revokeUserEndpoint: (userId: string) => string;

  roleEndpoint: (roleName: string) => string;

  rolesEndpoint: () => string;

  userEndpoint: () => string;

  verifyEndpoint: (token: string) => string;

  constructor() {
    this.authorizeRoleEndpoint = authorizeRoleEndpoint;
    this.authorizeUserEndpoint = authorizeUserEndpoint;
    this.listUsersEndpoint = listUsersEndpoint;
    this.loginEndpoint = loginEndpoint;
    this.permissionEndpoint = permissionEndpoint;
    this.permissionsEndpoint = permissionsEndpoint;
    this.revokeRoleEndpoint = revokeRoleEndpoint;
    this.revokeUserEndpoint = revokeUserEndpoint;
    this.roleEndpoint = roleEndpoint;
    this.rolesEndpoint = rolesEndpoint;
    this.userEndpoint = userEndpoint;
    this.verifyEndpoint = verifyEndpoint;
  }

  async getCurrentUser() {
    const res = await axiosClient.get<UserEndpointResponse>(
      this.userEndpoint(),
    );
    return res;
  }

  async registerUser(data: RegisterEndpointRequest) {
    const res = await axiosClient.post<RegisterUserEndpointResponse>(
      this.userEndpoint(),
      data,
    );
    return res;
  }

  async updateUser(data: UpdateEndpointRequest) {
    const res = await axiosClient.put<UserEndpointResponse>(
      this.userEndpoint(),
      data,
    );
    return res;
  }

  async login(data: LoginEndpointRequest) {
    const res = await axios.post<ObtainTokenResponse>(
      this.loginEndpoint(),
      data,
    );
    localStorage.setItem('refreshToken', res.data.refresh_token);
    localStorage.setItem('bearerToken', res.data.bearer_token);
    window.electron.ipcRenderer.invoke(
      STORE_CHANNELS.Set,
      CONTEXT_KEYS.loggedIn,
      true,
    );
    axiosClient.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${res.data.bearer_token}`;
      return config;
    });
    return res;
  }

  async verifyRegistration(token: string) {
    const res = await axios.get<UserEndpointResponse>(
      this.verifyEndpoint(token),
    );
    return res;
  }

  async getUsers({
    queryKey,
  }: QueryFunctionContext<[string, number | null | undefined]>) {
    const [_, page] = queryKey;
    const res = await axios.get<UserListEndpointResponse>(
      `${this.listUsersEndpoint()}?page=${page ?? 0}`,
    );
    return res;
  }

  async getRoles({
    queryKey,
  }: QueryFunctionContext<[string, number | null | undefined]>) {
    const [_, page] = queryKey;
    const res = await axiosClient.get<RolesListResponse>(
      `${this.rolesEndpoint()}?page=${page ?? 0}`,
    );
    return res;
  }

  async addRole(data: AddRolePermissionRequest) {
    const res = await axiosClient.post<StatusMessageResponse>(
      this.rolesEndpoint(),
      data,
    );
    return res;
  }

  async deleteRole(roleName: string) {
    const res = await axiosClient.delete<StatusMessageResponse>(
      this.roleEndpoint(roleName),
    );
    return res;
  }

  async getPermissions({
    queryKey,
  }: QueryFunctionContext<[string, number | null | undefined]>) {
    const [_, page] = queryKey;
    const res = await axiosClient.get<PermissionsListResponse>(
      `${this.permissionsEndpoint()}?page=${page ?? 0}`,
    );
    return res;
  }

  async addPermission(data: AddRolePermissionRequest) {
    const res = await axiosClient.post<StatusMessageResponse>(
      this.permissionsEndpoint(),
      data,
    );
    return res;
  }

  async deletePermission(permissionName: string) {
    const res = await axiosClient.delete<StatusMessageResponse>(
      this.permissionEndpoint(permissionName),
    );
    return res;
  }

  async authorizeUser(userId: string, data: AuthorizeRevokeUserRoleRequest) {
    const res = await axiosClient.post<StatusMessageResponse>(
      this.authorizeUserEndpoint(userId),
      data,
    );
    return res;
  }

  async revokeUser(userId: string, data: AuthorizeRevokeUserRoleRequest) {
    const res = await axiosClient.post<StatusMessageResponse>(
      this.revokeUserEndpoint(userId),
      data,
    );
    return res;
  }

  async authorizeRole(
    roleName: string,
    data: AuthorizeRevokeRolePermissionRequest,
  ) {
    const res = await axiosClient.post<StatusMessageResponse>(
      this.authorizeRoleEndpoint(roleName),
      data,
    );
    return res;
  }

  async revokeRole(
    roleName: string,
    data: AuthorizeRevokeRolePermissionRequest,
  ) {
    const res = await axiosClient.post<StatusMessageResponse>(
      this.revokeRoleEndpoint(roleName),
      data,
    );
    return res;
  }
}

export default new UserService();
