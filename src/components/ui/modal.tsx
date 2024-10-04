import { CrossOutlined } from "@assets/social/cross";
import { useAutoDismiss } from "@hooks/useAutoDismiss";
import clsx from "clsx";
import { FC } from "react";

interface IModal {
  children: React.ReactNode;
  isOpen: boolean;
  isBadge: boolean;
  onClose: () => void;
}

const Modal: FC<IModal> = ({ children, isOpen, onClose, isBadge }) => {
  const changeModalContent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  isBadge && useAutoDismiss(isOpen, onClose, 4000);

  return (
    <div
      onClick={onClose}
      className={clsx(
        "top-0 left-0 z-50 fixed h-screen w-screen bg-[#8F8AA759] flex items-center justify-center",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className="bg-white-100 absolute p-2 rounded-2xl"
        onClick={changeModalContent}
      >
        <span className="w-full flex justify-end" onClick={onClose}>
          <CrossOutlined />
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
