import { CompanyLogoOutlined } from "@assets/social/company-logo";
import { CrossOutlined } from "@assets/social/cross";
import { HeartOutlined } from "@assets/social/heart";
import { UserOutlined } from "@assets/social/mock-user-logo";
import { NotificateOutlined } from "@assets/social/notificate";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/useAppSelector";
import { notificationSelector } from "@redux/selectors";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const HeaderContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { notification } = useAppSelector(notificationSelector);
  const { readNotification } = useActions();

  useEffect(() => {
    readNotification();
  }, [isVisible]);
  console.log(notification);
  return (
    <>
      <section className="flex items-center space-x-2 ">
        <span>
          <CompanyLogoOutlined />
        </span>
        <div className="text-xl text-blue-950">
          <span>at-</span>
          <span className="font-bold">work</span>
        </div>
      </section>
      <section className="flex items-center space-x-3">
        <span>
          <HeartOutlined />
        </span>
        <span className="cursor-pointer" onClick={() => setIsVisible(true)}>
          <NotificateOutlined />
        </span>
        <div className="flex space-x-2 items-center">
          <span className="cursor-pointer">
            <UserOutlined />
          </span>
          <h2>Ivan2005</h2>
        </div>
      </section>

      <div className={`group absolute right-[68px] inline-block `}>
        <div className="hidden md:block">
          <span
            className={`${
              isVisible
                ? "visible scale-100  opacity-100 transition-all duration-[400ms]"
                : "invisible scale-0 opacity-0 transition-all duration-[400ms]"
            } absolute right-0 z-50 top-2 mt-2 rounded-2xl border border-gray-200  bg-white-100`}
          >
            <span className="absolute right-0  cursor-pointer p-[12px] text-violet-800">
              {/* <CrossOutlined /> */}
            </span>
            <span
              className={`absolute -top-[10px] z-50 right-[20px] h-0 w-0 border-x-8 border-b-[10px]  border-x-transparent border-b-gray-400 md:right-[35px]`}
            />
            <div className="h-10 bg-gray-100 rounded-2xl flex justify-center items-center">
              Уведомления
            </div>

            <div className="m-6 bg-white-100 w-[360px] flex flex-col space-y-3">
              {notification.map((notificate) => (
                <div>
                  <div className="text-sm ml-1 mb-1">
                    {`${new Date(notificate.date)
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:${new Date(notificate.date)
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}`}
                  </div>
                  <div
                    className={clsx(
                      " p-2 rounded-2xl",
                      notificate.isRead
                        ? "bg-gray-100"
                        : "delay-500 bg-gray-200 "
                    )}
                  >
                    {notificate.description}
                  </div>
                </div>
              ))}
            </div>
          </span>
        </div>
        {isVisible && (
          <div
            className={`pointer-events-auto fixed right-0 top-0 h-screen w-screen bg-shade-100 transition-all duration-300`}
            onClick={() => setIsVisible(false)}
          />
        )}
      </div>
    </>
  );
};
