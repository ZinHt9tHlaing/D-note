import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <main className="px-5 md:w-2/3 mx-auto">
      <Navbar />
      <div className="md:w-3/4 mx-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
