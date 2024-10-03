import { notificationActions, notificationReducer } from "./notification-slice";
import { userActions, userReducer } from "./user-slice";

export const reducers = {
  userReducer,
  notificationReducer,
};

export const actions = {
  ...userActions,
  ...notificationActions,
};
