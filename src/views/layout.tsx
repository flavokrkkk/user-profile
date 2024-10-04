import { HeaderContent } from "@components/header-content";
import { Header } from "@components/ui/header";
import { useActions } from "@hooks/useActions";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const { getUser } = useActions();

  useEffect(() => {
    console.log("object");
    getUser({ _limit: 9 });
  }, []);

  return (
    <div className="bg-gray-100">
      <Header>
        <HeaderContent />
      </Header>
      <section className="mx-auto flex md:max-w-[1160px] min-h-[93.5vh] ">
        <Outlet />
      </section>
    </div>
  );
};
