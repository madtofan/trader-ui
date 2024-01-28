import axios from "axios";
import { authorizeRoleEndpoint, authorizeUserEndpoint, loginEndpoint, permissionEndpoint, permissionsEndpoint, refreshEndpoint, revokeRoleEndpoint, revokeUserEndpoint, roleEndpoint, rolesEndpoint, userEndpoint, verifyEndpoint } from "@/config/api";
import { RegisterEndpointRequest } from "@/bindings/user/RegisterEndpointRequest";
import { UpdateEndpointRequest } from "@/bindings/user/UpdateEndpointRequest";
import { LoginEndpointRequest } from "@/bindings/user/LoginEndpointRequest";
import { RefreshtokenEndpointRequest } from "@/bindings/user/RefreshtokenEndpointRequest";
import { AddRolePermissionRequest } from "@/bindings/user/AddRolePermissionRequest";
import { AuthorizeRevokeUserRoleRequest } from "@/bindings/user/AuthorizeRevokeUserRoleRequest";
import { AuthorizeRevokeRolePermissionRequest } from "@/bindings/user/AuthorizeRevokeRolePermissionRequest";
import { UserEndpointResponse } from "@/bindings/user/UserEndpointResponse";
import { RegisterUserEndpointResponse } from "@/bindings/user/RegisterUserEndpointResponse";
import { ObtainTokenResponse } from "@/bindings/user/ObtainTokenResponse";
import { StatusMessageResponse } from "@/bindings/StatusMessageResponse";
import { RolesListResponse } from "@/bindings/user/RolesListResponse";
import { PermissionsListResponse } from "@/bindings/user/PermissionsListResponse";

class UserService {
  async getCurrentUser() {
    const res = await axios.get<UserEndpointResponse>(userEndpoint());
    return res;
  }

  async registerUser(data: RegisterEndpointRequest) {
    const res = await axios.post<RegisterUserEndpointResponse>(userEndpoint(), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }

  async updateUser(data: UpdateEndpointRequest) {
    const res = await axios.post<UserEndpointResponse>(userEndpoint(), {
      method: "PUT",
      body: JSON.stringify(data)
    });
    return res;
  }

  async login(data: LoginEndpointRequest) {
    const res = await axios.post<ObtainTokenResponse>(loginEndpoint(), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }

  async refreshToken(data: RefreshtokenEndpointRequest) {
    const res = await axios.post<ObtainTokenResponse>(refreshEndpoint(), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }

  async verifyRegistration(token: string) {
    const res = await axios.get<UserEndpointResponse>(verifyEndpoint(token));
    return res;
  }

  async getRoles() {
    const res = await axios.get<RolesListResponse>(rolesEndpoint());
    return res;
  }

  async addRole(data: AddRolePermissionRequest) {
    const res = await axios.post<StatusMessageResponse>(rolesEndpoint(), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }

  async deleteRole(roleName: string) {
    const res = await axios.delete<StatusMessageResponse>(roleEndpoint(roleName), {
      method: "DELETE"
    });
    return res;
  }

  async getPermissions() {
    const res = await axios.get<PermissionsListResponse>(permissionsEndpoint());
    return res;
  }

  async addPermission(data: AddRolePermissionRequest) {
    const res = await axios.post<StatusMessageResponse>(permissionsEndpoint(), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }

  async deletePermission(permissionName: string) {
    const res = await axios.delete<StatusMessageResponse>(permissionEndpoint(permissionName), {
      method: "DELETE"
    });
    return res;
  }

  async authorizeUser(userId: string, data: AuthorizeRevokeUserRoleRequest) {
    const res = await axios.post<StatusMessageResponse>(authorizeUserEndpoint(userId), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }

  async revokeUser(userId: string, data: AuthorizeRevokeUserRoleRequest) {
    const res = await axios.post<StatusMessageResponse>(revokeUserEndpoint(userId), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }

  async authorizeRole(roleName: string, data: AuthorizeRevokeRolePermissionRequest) {
    const res = await axios.post<StatusMessageResponse>(authorizeRoleEndpoint(roleName), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }

  async revokeRole(roleName: string, data: AuthorizeRevokeRolePermissionRequest) {
    const res = await axios.post<StatusMessageResponse>(revokeRoleEndpoint(roleName), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }
}

export default new UserService();
