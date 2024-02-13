import axios from "axios";
import { authorizeRoleEndpoint, authorizeUserEndpoint, loginEndpoint, permissionEndpoint, permissionsEndpoint, refreshEndpoint, revokeRoleEndpoint, revokeUserEndpoint, roleEndpoint, rolesEndpoint, userEndpoint, verifyEndpoint } from "@/config/api";
import { RegisterEndpointRequest } from "@/bindings/user/RegisterEndpointRequest";
import { UpdateEndpointRequest } from "@/bindings/user/UpdateEndpointRequest";
import { LoginEndpointRequest } from "@/bindings/user/LoginEndpointRequest";
import { AddRolePermissionRequest } from "@/bindings/user/AddRolePermissionRequest";
import { AuthorizeRevokeUserRoleRequest } from "@/bindings/user/AuthorizeRevokeUserRoleRequest";
import { AuthorizeRevokeRolePermissionRequest } from "@/bindings/user/AuthorizeRevokeRolePermissionRequest";
import { UserEndpointResponse } from "@/bindings/user/UserEndpointResponse";
import { RegisterUserEndpointResponse } from "@/bindings/user/RegisterUserEndpointResponse";
import { ObtainTokenResponse } from "@/bindings/user/ObtainTokenResponse";
import { StatusMessageResponse } from "@/bindings/StatusMessageResponse";
import { RolesListResponse } from "@/bindings/user/RolesListResponse";
import { PermissionsListResponse } from "@/bindings/user/PermissionsListResponse";
import { initializeAxiosClient } from ".";

const axiosClient = initializeAxiosClient();

class UserService {
  async getCurrentUser() {
    const res = await axiosClient.get<UserEndpointResponse>(userEndpoint());
    return res;
  }

  async registerUser(data: RegisterEndpointRequest) {
    const res = await axios.post<RegisterUserEndpointResponse>(userEndpoint(), data);
    return res;
  }

  async updateUser(data: UpdateEndpointRequest) {
    const res = await axiosClient.put<UserEndpointResponse>(userEndpoint(), data);
    return res;
  }

  async login(data: LoginEndpointRequest) {
    const res = await axios.post<ObtainTokenResponse>(loginEndpoint(), data);
    localStorage.setItem("refreshToken", res.data.refresh_token);
    localStorage.setItem("bearerToken", res.data.bearer_token);
    axiosClient.interceptors.request.use((config) => {
      config.headers["authorization"] = `Bearer ${res.data.bearer_token}`;
      return config;
    })
    return res;
  }


  async verifyRegistration(token: string) {
    const res = await axios.get<UserEndpointResponse>(verifyEndpoint(token));
    return res;
  }

  async getRoles() {
    const res = await axiosClient.get<RolesListResponse>(rolesEndpoint());
    return res;
  }

  async addRole(data: AddRolePermissionRequest) {
    const res = await axiosClient.post<StatusMessageResponse>(rolesEndpoint(), data);
    return res;
  }

  async deleteRole(roleName: string) {
    const res = await axiosClient.delete<StatusMessageResponse>(roleEndpoint(roleName));
    return res;
  }

  async getPermissions() {
    const res = await axiosClient.get<PermissionsListResponse>(permissionsEndpoint());
    return res;
  }

  async addPermission(data: AddRolePermissionRequest) {
    const res = await axiosClient.post<StatusMessageResponse>(permissionsEndpoint(), data);
    return res;
  }

  async deletePermission(permissionName: string) {
    const res = await axiosClient.delete<StatusMessageResponse>(permissionEndpoint(permissionName));
    return res;
  }

  async authorizeUser(userId: string, data: AuthorizeRevokeUserRoleRequest) {
    const res = await axiosClient.post<StatusMessageResponse>(authorizeUserEndpoint(userId), data);
    return res;
  }

  async revokeUser(userId: string, data: AuthorizeRevokeUserRoleRequest) {
    const res = await axiosClient.post<StatusMessageResponse>(revokeUserEndpoint(userId), data);
    return res;
  }

  async authorizeRole(roleName: string, data: AuthorizeRevokeRolePermissionRequest) {
    const res = await axiosClient.post<StatusMessageResponse>(authorizeRoleEndpoint(roleName), data);
    return res;
  }

  async revokeRole(roleName: string, data: AuthorizeRevokeRolePermissionRequest) {
    const res = await axiosClient.post<StatusMessageResponse>(revokeRoleEndpoint(roleName), data);
    return res;
  }
}

export default new UserService();
