import { useActions } from "@hooks/useActions";
import { IUser } from "@models/IUser";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonTypes } from "./ui/button";
import clsx from "clsx";
import { Input } from "./input";
import { formKeysData, formKeysTitle } from "@utils/form-keys";

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
  }, [formKeysData.map((el) => watch("name"))]);

  return (
    <form
      className="mt-4 max-w-[420px] flex flex-col space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex flex-col space-y-5">
        {formKeysData.map((value) => (
          <div className="flex flex-col space-y-3">
            <span className="font-semibold">{formKeysTitle[value]}</span>
            <Input
              key={value}
              isEdit={isEditForm}
              onClick={() => resetField(value)}
              disabled={!isEditForm}
              className="rounded-3xl border-none"
              validate={register(value, {
                required: "This field is required",
              })}
            />
            {!!errors[value]?.message && (
              <h1 className="text-red-700 text-sm">{errors[value]?.message}</h1>
            )}
          </div>
        ))}
      </section>
      <div>
        {isEditForm ? (
          <div className="flex space-x-3">
            <Button
              type={ButtonTypes.SUBMIT}
              isDisabled={isDisabled}
              className={clsx(
                "text-xs ",
                isDisabled
                  ? "text-gray-400"
                  : "border border-white-100 hover:bg-white-100 hover:text-black-100 hover:border hover:border-black-100"
              )}
            >
              Сохранить
            </Button>
            <Button
              type={ButtonTypes.BUTTON}
              onClick={handleEditForm}
              className="text-xs border border-white-100 hover:bg-white-100 hover:text-black-100 hover:border hover:border-black-100"
            >
              Назад
            </Button>
          </div>
        ) : (
          <Button
            type={ButtonTypes.BUTTON}
            onClick={handleEditForm}
            className="text-xs border w-full md:w-auto flex justify-center border-white-100 hover:bg-white-100 hover:text-black-100 hover:border hover:border-black-100"
          >
            Изменить
          </Button>
        )}
      </div>
    </form>
  );
};
