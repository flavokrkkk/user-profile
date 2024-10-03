import { reducers } from "@redux/reducers";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const reducer = combineReducers(reducers);

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
