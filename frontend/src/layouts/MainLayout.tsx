import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { Bounce, ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <main className="px-5 md:w-2/3 mx-auto">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Navbar />
      <div className="md:w-5/6 mx-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
