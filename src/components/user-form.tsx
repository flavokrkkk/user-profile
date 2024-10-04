import { useActions } from "@hooks/useActions";
import { IUser } from "@models/IUser";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonTypes } from "./ui/button";
import clsx from "clsx";
import { Input } from "./input";
import { formKeysData, formKeysTitle } from "@utils/form-keys";
import ReuseUserForm from "./reuse-user-form";

interface IUserForm {
  user: IUser;
  onOpen: () => void;
}
export const UserForm: FC<IUserForm> = ({ user, onOpen }) => {
  const { editUserInfo, addNotificate } = useActions();
  const [isEditForm, setIsEditForm] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    resetField,
    reset,
    watch,
    formState: { dirtyFields, errors },
  } = useForm<IUser>({
    defaultValues: {
      name: user.name,
      address: {
        street: user.address.street,
        city: user.address.city,
      },
      company: {
        name: user.company.name,
      },
      email: user.email,
      username: user.username,
      phone: user.phone,
    },
    mode: "onChange",
  });

  const handleEditForm = () => {
    setIsEditForm((prevState) => !prevState);
    if (isEditForm) {
      reset();
    }
  };

  const onSubmit: SubmitHandler<IUser> = (data, event) => {
    event?.preventDefault();
    editUserInfo(data);
    setIsEditForm(false);
    onOpen();
    addNotificate({
      id: Date.now(),
      date: new Date().toISOString(),
      description: "Вы успешно изменили данные пользователя!",
      isRead: false,
    });
  };

  const handleDisableButton = () => {
    const isButtonChanged = Object.keys(dirtyFields).length > 0;
    setIsDisabled(!isButtonChanged);
  };

  useEffect(() => {
    handleDisableButton();
  }, [formKeysData.map((el) => watch(el))]);

  return (
    <ReuseUserForm
      type="edit"
      errors={errors}
      handleEditForm={handleEditForm}
      handleSubmit={handleSubmit}
      isDisabled={isDisabled}
      isEditForm={isEditForm}
      onSubmit={onSubmit}
      register={register}
      resetField={resetField}
    />
  );
};
