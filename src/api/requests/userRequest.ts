import { AxiosResponse } from "axios";
import { authHost } from "..";
import { IUser } from "@models/IUser";

export interface IUserRequestParams {
  _limit: number;
}

export const userRequest = {
  get: (url: string, params?: IUserRequestParams) =>
    authHost.get(url, { params: params }),
};

export class UserApi {
  getUsers(params?: IUserRequestParams): Promise<AxiosResponse<IUser[]>> {
    return userRequest.get("users", params && params);
  }
}
