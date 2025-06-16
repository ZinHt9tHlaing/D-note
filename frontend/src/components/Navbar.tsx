import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-slate-100 py-2 px-1 mb-10 flex justify-between items-center">
      <Link to={"/"}>
        <h1 className="text-4xl text-teal-600 font-bold duration-200">
          Dnote.io
        </h1>
      </Link>
      <div className="flex gap-3">
        <Link to={"/create"}>
          <button className="text-teal-600 border-2 border-teal-600 px-2 py-1 cursor-pointer rounded hover:shadow-md hover:shadow-teal-200 active:scale-95 duration-200">
            Share Note
          </button>
        </Link>
        <NavLink
          to={"/login"}
          className={({ isActive }) =>
            isActive
              ? "bg-teal-600 text-white border-2 border-teal-600 px-2 py-1 cursor-pointer rounded hover:shadow-md hover:shadow-teal-200 active:scale-95 duration-200"
              : "text-teal-600 border-2 border-teal-600 px-2 py-1 cursor-pointer rounded hover:shadow-md hover:shadow-teal-200 active:scale-95 duration-200"
          }
        >
          Login
        </NavLink>
        <NavLink
          to={"/register"}
          className={({ isActive }) =>
            isActive
              ? "bg-teal-600 text-white border-2 border-teal-600 px-2 py-1 cursor-pointer rounded hover:shadow-md hover:shadow-teal-200 active:scale-95 duration-200"
              : "text-teal-600 border-2 border-teal-600 px-2 py-1 cursor-pointer rounded hover:shadow-md hover:shadow-teal-200 active:scale-95 duration-200"
          }
        >
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
