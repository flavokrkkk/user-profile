import { FC } from "react";

interface IControlPanel {
  isArchived: boolean;
  handleNavigateEditUser: () => void;
  handleArchivedUser: () => void;
  handleOnHideUser: () => void;
}

const ControlPanel: FC<IControlPanel> = ({
  isArchived,
  handleArchivedUser,
  handleNavigateEditUser,
  handleOnHideUser,
}) => {
  return (
    <div className="bg-white-100 flex flex-col space-y-2">
      <button className="text-start" onClick={handleNavigateEditUser}>
        Редактировать
      </button>
      <button className="text-start" onClick={handleArchivedUser}>
        {isArchived ? "Активировать" : "Архивировать"}
      </button>
      <button className="text-start" onClick={handleOnHideUser}>
        Скрыть
      </button>
    </div>
  );
};

export default ControlPanel;
