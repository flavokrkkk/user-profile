import { ArrowOutlined } from "@assets/social/arrow";
import { SuccessOutlined } from "@assets/social/success";
import { Loader } from "@components/ui/loader";
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
  console.log(users);
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
    <div className="flex flex-col w-full p-4 md:p-0">
      <div
        className="flex items-center mt-4 cursor-pointer"
        onClick={handleBackToMain}
      >
        <ArrowOutlined />
        Назад
      </div>
      <section className="w-full mt-2 md:mt-6 flex space-y-10 md:space-y-0 flex-col md:flex-row md:space-x-10">
        <UserDetails user={user} />
        <div className="w-full shadow-sm p-10 h-full rounded-2xl bg-white-100">
          <h1 className="text-xl md:text-2xl mb-3">Данные профиля</h1>
          <hr />
          <UserForm user={user} onOpen={handleModalVisible} />
        </div>
      </section>
      <Modal isBadge isOpen={isVisible} onClose={handleModalVisible}>
        <section className="flex justify-center items-center flex-col px-6 pb-5">
          <SuccessOutlined />
          <p className="font-semibold">Изменения сохранены!</p>
        </section>
      </Modal>
    </div>
  ) : (
    <Loader />
  );
};
