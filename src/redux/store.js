import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './reducer/auth-reducer';
import userReducer from './reducer/user-reducer';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
const persistConfig = {
   key: 'root',
   storage,
   stateReconciler: autoMergeLevel2,
   blacklist: [],
};

const rootReducer = combineReducers({
   authReducer,
   userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: [thunk],
});

export const persistor = persistStore(store);
