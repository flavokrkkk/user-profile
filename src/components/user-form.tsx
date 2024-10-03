import { useActions } from "@hooks/useActions";
import { IUser } from "@models/IUser";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonSizes, ButtonTypes } from "./ui/button";
import Input from "./ui/input";

interface IUserForm {
  user: IUser;
  onOpen: () => void;
}
export const UserForm: FC<IUserForm> = ({ user, onOpen }) => {
  const { editUserInfo, addNotificate } = useActions();
  const { register, handleSubmit } = useForm<IUser>({
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

  const onSubmit: SubmitHandler<IUser> = (data) => {
    editUserInfo(data);
    onOpen();
    addNotificate({
      id: Date.now(),
      date: new Date().toISOString(),
      description: "Вы успешно изменили данные пользователя!",
      isRead: false,
    });
  };

  return (
    <form
      className="mt-4 max-w-[420px] flex flex-col space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-3">
          <span className="font-semibold">Имя</span>
          <Input
            className="rounded-3xl"
            validate={register("name", {
              required: "This field is required",
            })}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <span className="font-semibold">Никнейм</span>
          <Input
            className="rounded-3xl"
            validate={register("username", {
              required: "This field is required",
            })}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <span className="font-semibold">Почта</span>
          <Input
            className="rounded-3xl"
            validate={register("email", {
              required: "This field is required",
            })}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <span className="font-semibold">Город</span>
          <Input
            className="rounded-3xl"
            validate={register("address.city", {
              required: "This field is required",
            })}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <span className="font-semibold">Телефон</span>
          <Input
            className="rounded-3xl"
            validate={register("phone", {
              required: "This field is required",
            })}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <span className="font-semibold">Название компании</span>
          <Input
            className="rounded-3xl"
            validate={register("company.name", {
              required: "This field is required",
            })}
          />
        </div>
      </section>
      <div>
        <Button
          type={ButtonTypes.SUBMIT}
          className="text-xs border border-white-100 hover:bg-white-100 hover:text-black-100 hover:border hover:border-black-100"
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};
