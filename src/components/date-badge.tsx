import { INotification } from "@redux/reducers/notification-slice";
import { FC, useMemo } from "react";

interface IDateBadge {
  date: INotification["date"];
}

export const DateBadge: FC<IDateBadge> = ({ date }) => {
  const [hours, minutes] = useMemo(() => {
    const hours = new Date(date).getHours().toString();
    const minutes = new Date(date).getMinutes().toString();
    return [hours.padStart(2, "0"), minutes.padStart(2, "0")];
  }, []);

  return (
    <div className="text-sm ml-1 mb-1">
      {hours}:{minutes}
    </div>
  );
};
