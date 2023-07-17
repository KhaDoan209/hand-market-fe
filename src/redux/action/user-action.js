import toast from 'react-hot-toast';
import {
   blockUserService,
   changePasswordService,
   changeUserRoleService,
   deleteUserService,
   getListDeletedUserService,
   getListUserService,
   getUserDetailService,
   restoreUserService,
   searchUserByEmailService,
   updateUserAddressService,
   updateUserInformationService,
   uploadUserAvatarService,
} from '../../services/user-service';
import { getSignedInUserReducer } from '../reducer/auth-reducer';
import {
   getListDeletedUserReducer,
   getListUserReducer,
   getUserDetailReducer,
} from '../reducer/user-reducer';

export const getListUserAction = (pageNumber = 1, pageSize = 8) => {
   return async (dispatch) => {
      try {
         const data = await getListUserService(pageNumber, pageSize);
         dispatch(getListUserReducer(data.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getListDeletedUserAction = (pageNumber = 1, pageSize = 8) => {
   return async (dispatch) => {
      try {
         const data = await getListDeletedUserService(pageNumber, pageSize);
         dispatch(getListDeletedUserReducer(data.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getUserDetailAction = (id) => {
   return async (dispatch) => {
      try {
         const data = await getUserDetailService(id);
         dispatch(getUserDetailReducer(data.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const searchUserByEmailAction = (
   email,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         await getListUserService(pageNumber, pageSize);
         const data = await searchUserByEmailService(email);
         dispatch(getListUserReducer(data.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const updateUserAddressAction = (
   id,
   body,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         await updateUserAddressService(id, body);
         const list_user = await getListUserService(pageNumber, pageSize);
         const user_detail = await getUserDetailService(id);
         dispatch(getListUserReducer(list_user.data));
         dispatch(getUserDetailReducer(user_detail.data));
         toast.success('Updated successfully', 1000);
      } catch (error) {
         console.log(error);
      }
   };
};

export const updateUserInformationAction = (data, id) => {
   return async (dispatch) => {
      try {
         toast.success('Updated successfully');
         await updateUserInformationService(data, id);
         const user_detail = await getUserDetailService(id);
         localStorage.setItem(
            import.meta.env.VITE_SIGNED_IN_USER,
            JSON.stringify(user_detail.data)
         );
         dispatch(getSignedInUserReducer(user_detail.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const uploadUserAvatarAction = (data, id) => {
   return async (dispatch) => {
      try {
         await uploadUserAvatarService(data, id);
         const userDetail = await getUserDetailService(id);
         dispatch(getUserDetailReducer(userDetail.data));
         dispatch(getSignedInUserReducer(userDetail.data));
      } catch (error) {
         console.log(error);
      }
   };
};
export const blockUserAction = (id, message) => {
   return async (dispatch) => {
      try {
         await blockUserService(id);
         const data = await getListUserService(1, 8);
         dispatch(getListUserReducer(data.data));
         toast.success(message, 1000);
      } catch (error) {
         console.log(error);
      }
   };
};

export const changePasswordAction = (id, body) => {
   return async (dispatch) => {
      try {
         toast.success('Password updated successfully');
         await changePasswordService(id, body);
      } catch (error) {
         console.log(error);
      }
   };
};

export const changeUserRoleAction = (id, role) => {
   return async (dispatch) => {
      try {
         toast.success('Role changed successfully');
         await changeUserRoleService(id, role);
         const data = await getUserDetailService(id);
         dispatch(getUserDetailReducer(data.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const restoreUserAction = (id, pageNumber = 1, pageSize = 8) => {
   return async (dispatch) => {
      try {
         toast.success('Account has been restored');
         await restoreUserService(id);
         const listDeletedUser = await getListDeletedUserService(
            pageNumber,
            pageSize
         );
         const listUser = await getListUserService(pageNumber, pageSize);
         dispatch(getListUserReducer(listUser.data));
         dispatch(getListDeletedUserReducer(listDeletedUser.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const deleteUserAction = (id, action, pageNumber = 1, pageSize = 8) => {
   return async (dispatch) => {
      try {
         toast.success('Deleted successfully', 1000);
         await deleteUserService(id, action);
         const listUser = await getListUserService(pageNumber, pageSize);
         const listDeletedUser = await getListDeletedUserService(
            pageNumber,
            pageSize
         );
         dispatch(getListUserReducer(listUser.data));
         dispatch(getListDeletedUserReducer(listDeletedUser.data));
      } catch (error) {
         console.log(error);
      }
   };
};
