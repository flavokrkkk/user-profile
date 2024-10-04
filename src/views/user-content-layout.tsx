import { Button, ButtonTypes } from "@components/ui/button";
import { UserList } from "@components/user-list";
import { IUser } from "@models/IUser";
import { FC, useState } from "react";

interface IUserContentLayout {
  title: string;
  users: IUser[];
  setVisible: () => void;
}

export const UserContentLayout: FC<IUserContentLayout> = ({
  title,
  users,
  setVisible,
}) => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);

  const handleTooltipToggle = (userId: number | string | boolean) => {
    if (activeTooltip === userId) {
      setActiveTooltip(null);
    } else {
      setActiveTooltip(userId as number);
    }
  };
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, user: IUser) => {
    setCurrentUser(user);
  };
  const handleDragEnd = (
    e: React.DragEvent<HTMLDivElement>,
    callback: () => void
  ) => {
    if (currentUser.id) {
      callback();
    }
  };
  return (
    <div className="w-full">
      <h1 className="text-2xl mb-4 font-semibold">{title}</h1>
      <hr />
      {users.length ? (
        <div className="flex flex-col items-center space-y-3 xs:space-y-0 xs:grid xs:grid-cols-2 md:grid-cols-3 xs:gap-8 mt-7">
          {users.map((user) => (
            <UserList
              key={user.id}
              user={user}
              isVisible={activeTooltip === user.id}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              onTooltipToggle={handleTooltipToggle}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="text-xl font-semibold mb-2">Здесь ничего нет!</h2>
          <p className="text-center text-gray-600 mb-6">
            Вы еще не добавили пользователей. Начните прямо сейчас!
          </p>
          <Button
            type={ButtonTypes.BUTTON}
            className="text-xs border w-full md:w-auto flex justify-center border-white-100 hover:bg-white-100 hover:text-black-100 hover:border hover:border-black-100"
            onClick={setVisible}
          >
            Добавить пользователя
          </Button>
        </div>
      )}
    </div>
  );
};
