import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="mx-auto flex max-w-[1440px]">
      <Outlet />
    </div>
  );
};

export default Layout;
