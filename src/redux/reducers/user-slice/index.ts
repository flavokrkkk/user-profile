import {
  asyncThunkCreator,
  buildCreateSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IUser } from "@models/IUser";
import { IUserRequestParams, UserApi } from "@api/requests/userRequest";
import { notificationActions } from "../notification-slice";

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export interface IUserState {
  isLoading: boolean;
  users: IUser[];
  user: IUser | null;
  errors: string | null;
}

const initialState: IUserState = {
  isLoading: false,
  users: [],
  user: null,
  errors: null,
};

export const userSlice = createSliceWithThunks({
  name: "user-slice",
  initialState,
  reducers: (create) => ({
    setArchivedUser: create.reducer(
      (state, { payload }: PayloadAction<number>) => {
        const findUser = state.users.findIndex((user) => user.id === payload);
        console.log(findUser);
        if (findUser !== -1) {
          state.users[findUser].isArchived = !state.users[findUser].isArchived;
        }
      }
    ),

    setOnHideUser: create.reducer(
      (state, { payload }: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.id !== payload);
      }
    ),

    setSelectUser: create.reducer(
      (state, { payload }: PayloadAction<IUser>) => {
        state.user = payload;
      }
    ),
    editUserInfo: create.reducer((state, { payload }: PayloadAction<IUser>) => {
      console.log(payload);
      const editUser = (state.user = { ...state.user, ...payload });
      const findUser = state.users.findIndex((user) => user.id === editUser.id);
      if (findUser !== -1) {
        state.users[findUser] = editUser;
      }
    }),
    getUser: create.asyncThunk<
      IUser[],
      IUserRequestParams,
      { rejectValue: string }
    >(
      async (requestParams, { rejectWithValue, dispatch }) => {
        try {
          const { data, status } = await new UserApi().getUsers(requestParams);
          if (!data.length && status !== 200)
            return rejectWithValue("Request Error");
          const extendUserModel = data.map((users) => {
            return {
              ...users,
              photo: null,
              isArchived: false,
            };
          });
          dispatch(
            notificationActions.addNotificate({
              id: Date.now(),
              date: new Date().toISOString(),
              description:
                "Вы получили список вами администрируемых пользователей!",
              isRead: false,
            })
          );
          return extendUserModel;
        } catch (err) {
          return rejectWithValue(`${err}`);
        }
      },
      {
        pending: (state, { payload }) => {
          state.isLoading = true;
        },
        fulfilled: (state, { payload }) => {
          console.log({ ...state.user });
          if (state.user !== null) {
            const findUser = payload.findIndex(
              (user) => user.id === state.user?.id
            );
            payload[findUser] = state.user;
            state.users = payload;
          }
          state.users = payload;
          state.isLoading = false;
        },
        rejected: (state) => {
          state.errors = "Не удалось получить пользователей!";
          state.isLoading = false;
        },
      }
    ),
  }),
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
