import { CrossOutlined } from "@assets/social/cross";
import { FC } from "react";

interface IInput {
  isEdit: boolean;
  validate: any;
  disabled: boolean;
  className: string;
  onClick: () => void;
}

export const Input: FC<IInput> = ({
  isEdit,
  onClick,
  validate,
  className,
  disabled,
}) => {
  return (
    <div className="border border-gray-300 rounded-3xl flex items-center">
      <input
        {...validate}
        disabled={disabled}
        className={`${className} outline-none bg-transparent-200 text-black rounded-2xl border-gray-300 p-2 font-light text-sm w-full focus:outline-none border placeholder:text-white`}
      />
      {isEdit && (
        <span className="cursor-pointer" onClick={onClick}>
          <CrossOutlined />
        </span>
      )}
    </div>
  );
};
