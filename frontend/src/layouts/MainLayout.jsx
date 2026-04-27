import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/NavBar";

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <Outlet />
      </div>
    </>
  );
};
