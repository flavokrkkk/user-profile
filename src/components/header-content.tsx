import { CompanyLogoOutlined } from "@assets/social/company-logo";
import { HeartOutlined } from "@assets/social/heart";
import { UserOutlined } from "@assets/social/mock-user-logo";
import { NotificateOutlined } from "@assets/social/notificate";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/useAppSelector";
import { notificationSelector } from "@redux/selectors";
import { useEffect, useMemo, useState } from "react";
import { NotificationPanel } from "./notification-panel";

export const HeaderContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { notification } = useAppSelector(notificationSelector);
  const { readNotification } = useActions();

  const notificationNoRead = useMemo(
    () => notification.filter((notificate) => !notificate.isRead).length,
    [notification]
  );

  const onOpenNotificationPanel = () => {
    readNotification();
    setIsVisible(true);
  };
  return (
    <>
      <section className="flex items-center space-x-2">
        <span>
          <CompanyLogoOutlined />
        </span>
        <div className="text-xl text-blue-950">
          <span>at-</span>
          <span className="font-bold">work</span>
        </div>
      </section>

      <section className="flex items-center space-x-3">
        <span className="hidden md:block">
          <HeartOutlined />
        </span>
        <section
          className="relative cursor-pointer hidden md:block"
          onClick={onOpenNotificationPanel}
        >
          {!!notificationNoRead && (
            <div className="absolute left-2 flex items-center justify-center text-white-100 rounded-full bg-red-700 text-[4px] w-[10px] h-[10px]">
              <span>{notificationNoRead}</span>
            </div>
          )}
          <NotificateOutlined />
        </section>
        <div className="flex space-x-2 items-center">
          <span className="cursor-pointer">
            <UserOutlined />
          </span>
          <h2 className="hidden sm:block">Admin</h2>
        </div>
      </section>
      <NotificationPanel isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
  );
};
