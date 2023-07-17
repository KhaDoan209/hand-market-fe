import {
   getListCategoryService,
   getListProductTypeService,
} from '../../services/category-service';
import {
   getListCategoryReducer,
   getListProductTypeReducer,
} from '../reducer/category-reducer';

export const getListCategoryAction = () => {
   return async (dispatch) => {
      try {
         const data = await getListCategoryService();
         dispatch(getListCategoryReducer(data.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getListProductTypesAction = (id) => {
   return async (dispatch) => {
      try {
         const list_type = await getListProductTypeService(id);
         dispatch(getListProductTypeReducer(list_type.data));
      } catch (error) {
         console.log(error);
      }
   };
};
