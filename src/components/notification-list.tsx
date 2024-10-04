import { INotification } from "@redux/reducers/notification-slice";
import clsx from "clsx";
import React, { FC } from "react";
import { DateBadge } from "./date-badge";

interface INotificationList {
  notification: INotification;
}

export const NotificationList: FC<INotificationList> = ({ notification }) => (
  <div className="flex flex-col space-y-2">
    <DateBadge date={notification.date} />
    <div
      className={clsx(
        "p-3 rounded-lg transition-all duration-300 shadow-sm",
        notification.isRead
          ? "bg-gray-100 text-gray-600"
          : "bg-blue-50 text-blue-900 font-semibold"
      )}
    >
      {notification.description}
    </div>
  </div>
);
