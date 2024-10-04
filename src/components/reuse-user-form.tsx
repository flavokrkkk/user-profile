import { EFormKeys, formKeysData, formKeysTitle } from "@utils/form-keys";
import { Input } from "./input";
import { Button, ButtonTypes } from "./ui/button";
import clsx from "clsx";
import {
  FieldErrors,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
} from "react-hook-form";
import { IUser } from "@models/IUser";
import { FC, FormEventHandler } from "react";
import { isBoolean } from "util";

interface IReuseUserForm {
  type: "edit" | "create";
  errors: any;
  isDisabled?: boolean;
  isEditForm?: boolean;
  resetField: (value: EFormKeys) => void;
  handleSubmit: (
    value: SubmitHandler<IUser>
  ) => FormEventHandler<HTMLFormElement>;
  onSubmit: (value: IUser) => void;
  register: (
    name: any,
    options?: RegisterOptions<IUser, any> | undefined
  ) => UseFormRegisterReturn<any>;
  handleEditForm?: () => void;
}

const ReuseUserForm: FC<IReuseUserForm> = ({
  errors,
  type,
  isEditForm,
  isDisabled,
  handleSubmit,
  onSubmit,
  resetField,
  register,
  handleEditForm,
}) => {
  return (
    <form
      className="mt-4 max-w-[420px] flex flex-col space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex flex-col space-y-5">
        {formKeysData.map((value) => (
          <div className="flex flex-col space-y-3">
            <span className="text-sm md:text-base font-semibold">
              {formKeysTitle[value]}
            </span>
            <Input
              key={value}
              isEdit={isEditForm ?? false}
              onClick={() => resetField(value)}
              disabled={isBoolean(isEditForm) ? !isEditForm : false}
              className="rounded-3xl border-none "
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
        {type === "edit" ? (
          isEditForm ? (
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
          )
        ) : (
          type === "create" && (
            <div className=" w-full">
              <Button
                type={ButtonTypes.SUBMIT}
                className={clsx(
                  "text-xs ",
                  isDisabled
                    ? "text-gray-400"
                    : "border w-full flex justify-center border-white-100 hover:bg-white-100 hover:text-black-100 hover:border hover:border-black-100"
                )}
              >
                Сохранить
              </Button>
            </div>
          )
        )}
      </div>
    </form>
  );
};

export default ReuseUserForm;
