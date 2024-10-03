import { ArrowOutlined } from "@assets/social/arrow";
import { SuccessOutlined } from "@assets/social/success";
import Modal from "@components/ui/modal";
import { UserDetails } from "@components/user-details";
import { UserForm } from "@components/user-form";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@redux/selectors";
import { ERoutesNames } from "@utils/routes-name";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ProfilePage = () => {
  const { users, user } = useAppSelector(userSelector);
  const { setSelectUser } = useActions();
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleModalVisible = useCallback(() => {
    setIsVisible((prevState) => !prevState);
  }, []);

  const handleBackToMain = () => {
    navigate(ERoutesNames.HOME);
  };

  useEffect(() => {
    if (users.length && id) {
      const findLessonById = users.findIndex((user) => user.id === +id);
      if (findLessonById !== -1) {
        setSelectUser(users[findLessonById]);
      } else {
        navigate(ERoutesNames.HOME);
      }
    }
  }, [user, users.length]);

  return users.length && user ? (
    <div className="flex flex-col w-full">
      <div
        className="flex items-center mt-4 cursor-pointer"
        onClick={handleBackToMain}
      >
        <ArrowOutlined />
        Назад
      </div>
      <section className="w-full mt-6 flex space-y-10 md:space-y-0 flex-col md:flex-row md:space-x-10">
        <UserDetails user={user} />
        <div className="border w-full p-10 h-full rounded-xl bg-white-100">
          <h1 className="text-2xl mb-3">Данные профиля</h1>
          <hr />
          <UserForm user={user} onOpen={handleModalVisible} />
        </div>
      </section>
      <Modal isOpen={isVisible} onClose={handleModalVisible}>
        <section className="flex justify-center items-center flex-col px-6 pb-5">
          <SuccessOutlined />
          <p className="font-semibold">Изменения сохранены!</p>
        </section>
      </Modal>
    </div>
  ) : (
    <div
      className={
        "h-min-80 absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center"
      }
    >
      <div
        className="text-blue-600 inline-block size-10 animate-spin rounded-full border-[3px] border-gray-300 border-t-transparent dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
