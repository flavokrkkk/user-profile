import React, { FC, HTMLAttributes } from "react";
import { memo } from "react";

export enum ButtonSizes {
  MEDIUM,
  SMALL,
}

export enum ButtonColors {
  BLACK,
}

interface IButtonClasses {
  disableClasses: string;
  activeClasses: string;
}

export const ButtonColorClasses: { [key in ButtonColors]: IButtonClasses } = {
  [ButtonColors.BLACK]: {
    activeClasses: "bg-black-100",
    disableClasses: "bg-gray-200",
  },
};

export const ButtonSizeClasses: { [key in ButtonSizes]: string } = {
  [ButtonSizes.MEDIUM]: "px-[16px] py-[10px] text-base",
  [ButtonSizes.SMALL]: "px-[30px] py-[7px] rounded-3xl text-xl",
};

export enum ButtonScreenSizes {
  MD,
  SM,
}

export enum ButtonTypes {
  BUTTON = "button",
  RESET = "reset",
  SUBMIT = "submit",
}

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: ButtonSizes;
  type?: ButtonTypes;
  bgColor?: ButtonColors;
  children?: React.ReactNode;
  value?: string;
  name?: string;
}

export const Button: FC<ButtonProps> = memo(
  ({
    onClick,
    className,
    isDisabled,
    type = ButtonTypes.BUTTON,
    size = ButtonSizes.SMALL,
    bgColor = ButtonColors.BLACK,
    children,
    name,
    value,
  }) => (
    <button
      className={`flex items-center text-white-100 transition-all ${className} ${
        ButtonSizeClasses[size]
      } ${
        ButtonColorClasses[bgColor][
          isDisabled ? "disableClasses" : "activeClasses"
        ]
      }`}
      disabled={isDisabled}
      onClick={isDisabled ? () => {} : onClick}
      type={type}
      name={name}
      value={value}
    >
      {children}
    </button>
  )
);
