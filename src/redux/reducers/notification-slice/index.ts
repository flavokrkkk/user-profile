import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INotification {
  id: number;
  date: string;
  description: string;
  isRead: boolean;
}

export interface INotficationState {
  notification: Array<INotification>;
}

export const initialState: INotficationState = {
  notification: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: (create) => ({
    addNotificate: create.reducer(
      (state, { payload }: PayloadAction<INotification>) => {
        state.notification.push(payload);
      }
    ),
    readNotification: create.reducer((state) => {
      state.notification = state.notification.map((notificate) => ({
        ...notificate,
        isRead: true,
      }));
    }),
  }),
});
export const notificationReducer = notificationSlice.reducer;
export const notificationActions = notificationSlice.actions;
