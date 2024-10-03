import { AsideMenuOutlined } from "@assets/social/aside-menu";
import { UserList } from "@components/user-list";
import { IUser } from "@models/IUser";
import { FC, useState } from "react";

interface IUserContentLayout {
  title: string;
  users: IUser[];
}

export const UserContentLayout: FC<IUserContentLayout> = ({ title, users }) => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const handleTooltipToggle = (userId: number | string) => {
    if (activeTooltip === userId) {
      setActiveTooltip(null);
    } else {
      setActiveTooltip(userId as number);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl mb-5">{title}</h1>
      <hr />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-7">
        {users.map((user) => (
          <UserList
            key={user.id}
            user={user}
            isVisible={activeTooltip === user.id}
            onTooltipToggle={handleTooltipToggle}
          />
        ))}
      </div>
    </div>
  );
};
