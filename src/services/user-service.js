import { http } from './axios-interceptor';
import { toastPromise } from '../utils/toast';
export const getListUserService = (pageNumber, pageSize) => {
   return http.get(
      `/user/get-list-user?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const getListDeletedUserService = (pageNumber, pageSize) => {
   return http.get(
      `/user/get-list-deleted-user?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const searchUserByEmailService = (email) => {
   return http.get(`/user/search-user-by-email?email=${email}`);
};

export const getUserDetailService = (id) => {
   return http.get(`/user/get-user-detail/${id}`);
};

export const deleteUserService = (id, action = '') => {
   return http.delete(`/user/delete-user/${id}?action=${action}`);
};

export const updateUserAddressService = (userId, body) => {
   return http.post(`/user/update-user-address/${userId}`, body);
};

export const changePasswordService = (userId, body) => {
   return http.patch(`/user/change-password/${userId}`, body);
};

export const changeUserRoleService = (userId, role) => {
   return http.patch(`/user/change-user-role/${userId}?role=${role}`);
};

export const blockUserService = (id) => {
   return http.patch(`/user/block-user/${id}`);
};

export const restoreUserService = (id) => {
   return http.patch(`/user/restore-user-account/${id}`);
};

export const updateUserInformationService = (data, id) => {
   return http.post(`/user/update-user-infor/${id}`, data);
};

export const uploadUserAvatarService = (data, id) => {
   return toastPromise(
      http.post(`/user/upload-user-avatar/${id}`, data),
      'Uploading, wait a sec!',
      5000
   );
};
