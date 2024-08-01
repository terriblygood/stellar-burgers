import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { Middleware, configureStore, combineReducers } from '@reduxjs/toolkit';

import ingredientsReducer from '../slices/ingredientsSlice';
import feedsReducer from '../slices/feedsSlice';
import userReducer from '../slices/userSlice';
import builderReducer from '../slices/builderSlice';
import ordersReducer from '../slices/ordersSlice';

import ordersMiddleware from './middlewares';

export const rootReducer = combineReducers({
  user: userReducer,
  builder: builderReducer,
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  orders: ordersReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ordersMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
