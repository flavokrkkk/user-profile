import React, { FC } from "react";

interface ICanvas {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const Canvas: FC<ICanvas> = ({ isVisible, children, onClose }) => {
  return (
    <div className={`group absolute  right-[68px] inline-block `}>
      <div className="hidden md:block">
        <section
          className={`overflow-auto h-[500px] ${
            isVisible
              ? "visible scale-100  opacity-100 transition-all duration-[400ms]"
              : "invisible scale-0 opacity-0 transition-all duration-[400ms]"
          } absolute right-0 z-50 top-2 mt-2 rounded-2xl border border-gray-200  bg-white-100`}
        >
          {children}
        </section>
      </div>
      {isVisible && (
        <div
          className={`pointer-events-auto fixed right-0 top-0 h-screen w-screen bg-shade-100 transition-all duration-300`}
          onClick={onClose}
        />
      )}
    </div>
  );
};
