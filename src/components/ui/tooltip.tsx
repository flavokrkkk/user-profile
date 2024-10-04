import { useEffect, useRef, FC, useState } from "react";
import { useOutside } from "@hooks/useOutside";

export const enum TooltipePosition {
  CENTER = "center",
  LEFT = "left",
  RIGHT = "right",
}

interface ITooltipe {
  isVisible: boolean;
  content: JSX.Element;
  children: React.ReactNode;
  placement?: TooltipePosition;
  setVisible: (value: boolean) => void;
}

const Tooltipe: FC<ITooltipe> = ({
  isVisible,
  content,
  children,
  setVisible,
  placement = TooltipePosition.CENTER,
}) => {
  const tooltipeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [tooltipPlacement, setTooltipePlacement] = useState<{
    right?: number;
    left?: number;
  }>({
    left: 0,
    right: 0,
  });

  const handleTooltipePlacement = () => {
    if (tooltipeRef.current && contentRef.current) {
      if (placement === TooltipePosition.CENTER) {
        setTooltipePlacement({
          left:
            -(
              tooltipeRef.current.offsetWidth - contentRef.current.offsetWidth
            ) / 2,
        });
      }
      if (placement === TooltipePosition.LEFT) {
        setTooltipePlacement({
          right: 0,
        });
      }
    }
  };

  useEffect(() => {
    handleTooltipePlacement();
  }, [isVisible]);

  useOutside(tooltipeRef, isVisible, () => setVisible(false));

  return (
    <>
      <div
        ref={contentRef}
        onClick={() => setVisible(!isVisible)}
        className="z-10"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipeRef}
          style={tooltipPlacement}
          className="bg-white-100 z-10 absolute border p-4 rounded-2xl"
        >
          {content}
        </div>
      )}
    </>
  );
};

export default Tooltipe;
