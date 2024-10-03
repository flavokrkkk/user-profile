import { AsideMenuOutlined } from "@assets/social/aside-menu";
import { IUser } from "@models/IUser";
import { FC, useCallback, useState } from "react";
import Tooltipe from "./ui/tooltip";
import { useNavigate } from "react-router-dom";
import { ERoutesNames } from "@utils/routes-name";
import { useActions } from "@hooks/useActions";
import noPhotoUser from "../../public/avatarka-mock.png";
import clsx from "clsx";

export interface IUserList {
  user: IUser;
  isVisible: boolean;
  onTooltipToggle: (userId: number | string) => void;
}

export const UserList: FC<IUserList> = ({
  user,
  isVisible,
  onTooltipToggle,
}) => {
  const { setArchivedUser, setOnHideUser, setSelectUser, addNotificate } =
    useActions();
  const navigate = useNavigate();

  const handleNavigateEditUser = () => {
    setSelectUser(user);
    navigate(`${ERoutesNames.PROFILE}/${user.id}`);
  };

  const handleArchivedUser = () => {
    setArchivedUser(user.id!);
    if (user.isArchived) {
      addNotificate({
        id: Date.now(),
        date: new Date().toISOString(),
        description: "Вы добавили пользователя в актив!",
        isRead: false,
      });
    } else {
      addNotificate({
        id: Date.now(),
        date: new Date().toISOString(),
        description: "Вы добавили пользователя в архив!",
        isRead: false,
      });
    }
  };

  const handleOnHideUser = () => {
    setOnHideUser(user.id!);
    addNotificate({
      id: Date.now(),
      date: new Date().toISOString(),
      description: "Вы скрыли пользователя!",
      isRead: false,
    });
  };

  return (
    <div>
      <div
        className={"h-full rounded-xl p-6 bg-white-100 justify-between flex"}
        key={user.id}
      >
        <section className="flex space-y-2 md:space-y-0 flex-col md:flex-row h-full md:space-x-5">
          <div className="w-[130px] h-[100px] rounded-xl flex justify-center">
            {user.photo ? (
              user.photo
            ) : (
              <img src={noPhotoUser} className="rounded-xl" />
            )}
          </div>
          <div className="w-full h-full flex flex-col justify-between">
            <section>
              <h1
                className={clsx(
                  "text-xl text-blue-400",
                  user.isArchived && "text-gray-600"
                )}
              >
                {user.name}
              </h1>
              <h2 className={clsx("", user.isArchived && "text-gray-300")}>
                {user.company.name}
              </h2>
            </section>
            <div
              className={clsx(
                "text-sm text-gray-300",
                user.isArchived && "text-gray-200"
              )}
            >
              {user.address.city}
            </div>
          </div>
        </section>
        <div className="cursor-pointer relative">
          <Tooltipe
            key={user.id}
            content={
              <div className="bg-white-100 flex flex-col space-y-2">
                <button className="text-start" onClick={handleNavigateEditUser}>
                  Редактировать
                </button>
                <button className="text-start" onClick={handleArchivedUser}>
                  {user.isArchived ? "Активировать" : "Архивировать"}
                </button>
                <button className="text-start" onClick={handleOnHideUser}>
                  Скрыть
                </button>
              </div>
            }
            isVisible={isVisible}
            setVisible={() => onTooltipToggle(user.id!)}
          >
            <span className="hover:text-blue-400">
              <AsideMenuOutlined />
            </span>
          </Tooltipe>
        </div>
      </div>
    </div>
  );
};
