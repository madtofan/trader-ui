export const API_SERVER = 'http://127.0.0.1:8000/api';

export const userEndpoint = () => `${API_SERVER}/user`;
export const loginEndpoint = () => `${API_SERVER}/user/login`;
export const refreshEndpoint = () => `${API_SERVER}/user/refresh`;
export const verifyEndpoint = (token: string) =>
  `${API_SERVER}/user/verify/${token}`;
export const rolesEndpoint = () => `${API_SERVER}/user/roles`;
export const roleEndpoint = (roleName: string) =>
  `${API_SERVER}/user/roles/${roleName}`;
export const permissionsEndpoint = () => `${API_SERVER}/user/permissions`;
export const permissionEndpoint = (permissionName: string) =>
  `${API_SERVER}/user/permissions/${permissionName}`;
export const authorizeUserEndpoint = (userId: string) =>
  `${API_SERVER}/user/authorize/user/${userId}`;
export const revokeUserEndpoint = (userId: string) =>
  `${API_SERVER}/user/revoke/user/${userId}`;
export const authorizeRoleEndpoint = (roleName: string) =>
  `${API_SERVER}/user/authorize/role/${roleName}`;
export const revokeRoleEndpoint = (roleName: string) =>
  `${API_SERVER}/user/revoke/role/${roleName}`;

export const templatingEndpoint = () => `${API_SERVER}/templating`;
export const removeTemplatingEndpoint = (templateName: string) =>
  `${API_SERVER}/templating/${templateName}`;

export const sendNotificationEndpoint = () => `${API_SERVER}/notification`;
export const getNotificationsEndpoint = (bearerToken: string) =>
  `${API_SERVER}/notification/${bearerToken}`;
export const listNotificationEndpoint = (page: number) => `${API_SERVER}/notification/log?page=${page}`;
export const subscribeNotificationEndpoint = (groupName: string) =>
  `${API_SERVER}/notification/subscribe/${groupName}`;
export const addNotificationGroupEndpoint = () =>
  `${API_SERVER}/notification/group`;
export const removeNotificationGroupEndpoint = (
  groupName: string,
  adminEmail: string,
) => `${API_SERVER}/notification/group/${groupName}/${adminEmail}`;
