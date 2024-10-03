import { IUser } from "@models/IUser";
import { FC } from "react";
import bigSizePhoto from "../../public/avatarka-big.png";

interface IUserDetails {
  user: IUser;
}

export const UserDetails: FC<IUserDetails> = ({ user }) => {
  return (
    <div className="border md:w-[400px] h-full rounded-xl bg-white-100 p-10 space-y-[47px]">
      <div className=" rounded-xl">
        <img src={bigSizePhoto} />
      </div>
      <section className="flex flex-col space-y-4">
        <div className="border-b pb-2 font-medium">Данные профиля</div>
        <div className="border-b border-gray-100 pb-2 text-gray-300">
          Рабочее пространство
        </div>
        <div className="border-b border-gray-100 pb-2 text-gray-300">
          Приватность
        </div>
        <div className="border-b border-gray-100 pb-2 text-gray-300">
          Безопасность
        </div>
      </section>
    </div>
  );
};
