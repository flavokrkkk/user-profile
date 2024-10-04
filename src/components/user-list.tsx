import { AsideMenuOutlined } from "@assets/social/aside-menu";
import { IUser } from "@models/IUser";
import { FC, memo, useCallback, useMemo, useState } from "react";
import Tooltipe, { TooltipePosition } from "./ui/tooltip";
import { useNavigate } from "react-router-dom";
import { ERoutesNames } from "@utils/routes-name";
import { useActions } from "@hooks/useActions";
import noPhotoUser from "../../public/avatarka-mock.png";
import clsx from "clsx";
import ControlPanel from "./control-panel";

export interface IUserList {
  user: IUser;
  isVisible: boolean;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, user: IUser) => void;
  handleDragEnd: (
    e: React.DragEvent<HTMLDivElement>,
    callback: () => void
  ) => void;
  onTooltipToggle: (userId: number | string | boolean) => void;
}

export const UserList: FC<IUserList> = memo(
  ({ user, isVisible, handleDragEnd, handleDragStart, onTooltipToggle }) => {
    const { setArchivedUser, setOnHideUser, setSelectUser, addNotificate } =
      useActions();
    const navigate = useNavigate();

    const notificate = useMemo(() => {
      const notificate = {
        id: Date.now(),
        date: new Date().toISOString(),
        isRead: false,
      };
      return notificate;
    }, [user.isArchived]);

    const handleNavigateEditUser = useCallback(() => {
      setSelectUser(user);
      navigate(`${ERoutesNames.PROFILE}/${user.id}`);
    }, []);

    const handleOpenTooltip = () => onTooltipToggle(user.id!);

    const handleArchivedUser = useCallback(() => {
      onTooltipToggle(false);
      setArchivedUser(user.id!);
      if (user.isArchived) {
        addNotificate({
          ...notificate,
          description: "Вы добавили пользователя в актив!",
        });
      } else {
        addNotificate({
          ...notificate,
          description: "Вы добавили пользователя в архив!",
        });
      }
    }, []);

    const handleOnHideUser = useCallback(() => {
      setOnHideUser(user.id!);
      addNotificate({
        ...notificate,
        description: "Вы скрыли пользователя!",
      });
    }, []);

    return (
      <div
        onDragStart={(e) => handleDragStart(e, user)}
        onDragEnd={(e) => handleDragEnd(e, handleArchivedUser)}
        draggable
        className={clsx(
          "h-auto w-full hover:scale-105  transition duration-300 ease-in-out   max-w-[280px] md:max-w-[320px] lg:max-w-[360px] cursor-pointer rounded-2xl p-4 bg-white shadow-md flex flex-col justify-between",
          user.isArchived ? "bg-gray-200" : "bg-white-100"
        )}
        key={user.id}
      >
        <section className="flex space-y-4 md:space-x-4 w-full h-auto flex-col md:flex-row">
          <div className="w-full md:w-[100px] h-[100px] md:h-[100px] flex-shrink-0 rounded-lg overflow-hidden">
            {user.photo ? (
              <img
                src={user.photo}
                alt="User Photo"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <img
                src={noPhotoUser}
                alt="No Photo Available"
                className={clsx(
                  "object-cover w-full h-full rounded-lg filter transition duration-300 ease-in-out hover:blur-md",
                  user.isArchived && "blur-md"
                )}
              />
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h1
                  className={clsx(
                    "text-lg font-semibold text-blue-400 truncate line-clamp-1 w-[79px]",
                    user.isArchived && "text-gray-600"
                  )}
                >
                  {user.username}
                </h1>
                <h2
                  className={clsx(
                    "text-sm truncate line-clamp-1 w-[80px]",
                    user.isArchived && "text-gray-300"
                  )}
                >
                  {user.company.name}
                </h2>
              </div>
              <div className="relative flex-shrink-0">
                <Tooltipe
                  key={user.id}
                  placement={TooltipePosition.LEFT}
                  content={
                    <ControlPanel
                      isArchived={user.isArchived}
                      handleOnHideUser={handleOnHideUser}
                      handleArchivedUser={handleArchivedUser}
                      handleNavigateEditUser={handleNavigateEditUser}
                    />
                  }
                  isVisible={isVisible}
                  setVisible={handleOpenTooltip}
                >
                  <span className="hover:text-blue-400">
                    <AsideMenuOutlined size={20} />
                  </span>
                </Tooltipe>
              </div>
            </div>
            <div
              className={clsx(
                "text-sm text-gray-500 truncate",
                user.isArchived && "text-gray-200"
              )}
            >
              <h3 className="line-clamp-1 w-[40px]">{user.address.city}</h3>
            </div>
          </div>
        </section>
      </div>
    );
  }
);
