import { RootState } from "@store/store";

export const userSelector = (state: RootState) => state.userReducer;
export const notificationSelector = (state: RootState) =>
  state.notificationReducer;
