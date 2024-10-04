import ReuseUserForm from "@components/reuse-user-form";
import { Loader } from "@components/ui/loader";
import Modal from "@components/ui/modal";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/useAppSelector";
import { IUser } from "@models/IUser";
import { userSelector } from "@redux/selectors";
import { UserContentLayout } from "@views/user-content-layout";
import { useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const HomePage = () => {
  const { users, isLoading } = useAppSelector(userSelector);
  const { addUser, addNotificate } = useActions();
  const [isVisible, setIsVisible] = useState(false);

  const [archived, active] = useMemo(() => {
    const archived = users.filter((user) => user.isArchived);
    const active = users.filter((user) => !user.isArchived);
    return [archived, active];
  }, [users]);

  const {
    register,
    handleSubmit,
    resetField,
    reset,
    watch,
    formState: { errors },
  } = useForm<IUser>({});

  const onSubmit: SubmitHandler<IUser> = (data, event) => {
    addUser(data);
    addNotificate({
      id: Date.now(),
      date: new Date().toISOString(),
      isRead: false,
      description:
        "Вы добавили нового пользователя в свою команду, ему тоже придет письмо!",
    });
    reset();
    setIsVisible(false);
  };

  const handleVisibleModal = useCallback(() => {
    setIsVisible((prevState) => !prevState);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <section className="text-black-100 mt-7 w-full flex flex-col space-y-8 mb-10 p-4 md:p-0">
        <UserContentLayout
          title="Активные"
          users={active}
          setVisible={handleVisibleModal}
        />
        <UserContentLayout
          title="Архив"
          users={archived}
          setVisible={handleVisibleModal}
        />
      </section>
      <Modal isOpen={isVisible} isBadge={false} onClose={handleVisibleModal}>
        <div className="mx-10 w-[300px] md:w-[430px] mb-4">
          <h2 className="text-center text-xl"> Добавление пользователя</h2>
          <ReuseUserForm
            resetField={resetField}
            type="create"
            errors={errors}
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </>
  );
};
