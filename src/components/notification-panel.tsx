import { useAppSelector } from "@hooks/useAppSelector";
import { notificationSelector } from "@redux/selectors";
import { FC, useCallback } from "react";
import { NotificationList } from "./notification-list";
import { Canvas } from "./ui/canvas";

interface INotificationPanel {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

export const NotificationPanel: FC<INotificationPanel> = ({
  isVisible,
  setIsVisible,
}) => {
  const { notification } = useAppSelector(notificationSelector);

  const handleClosePanel = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <Canvas isVisible={isVisible} onClose={handleClosePanel}>
      <div
        className={`absolute -top-[10px] z-50 right-[20px] h-0 w-0 border-x-8 border-b-[10px] border-x-transparent border-b-gray-300 md:right-[35px]`}
      />
      <div className="h-12 bg-gray-100 rounded-t-2xl flex justify-center items-center font-semibold text-gray-700 text-lg shadow-md">
        Уведомления
      </div>
      <div className="px-6 py-4 bg-white-100 w-[360px] flex flex-col space-y-4 h-auto shadow-lg rounded-b-2xl">
        {notification.length > 0 ? (
          notification.map((notificate) => (
            <NotificationList key={notificate.id} notification={notificate} />
          ))
        ) : (
          <div className="text-center text-gray-500">Нет новых уведомлений</div>
        )}
      </div>
    </Canvas>
  );
};
