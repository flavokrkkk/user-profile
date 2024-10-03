import { ChangeEvent, FC, RefObject } from "react";
import { UseFormRegister } from "react-hook-form";

interface IIntput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value?: string;
  type?: string;
  name?: string;
  validate: any;
  placeholder?: string;
  inputRef?: RefObject<HTMLInputElement>;
  className?: string;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IIntput> = ({
  type = "text",
  name,
  value,
  className,
  inputRef,
  placeholder,
  onKeyPress,
  onChange,
  validate,
}) => {
  return (
    <input
      className={`${className} outline-none bg-transparent-200 text-black rounded-md p-2 font-light text-sm w-full focus:outline-none border placeholder:text-white`}
      value={value}
      type={type}
      ref={inputRef}
      name={name}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      onChange={onChange}
      {...validate}
    />
  );
};

export default Input;
