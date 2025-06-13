import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-slate-100 py-2 px-1 mb-10 flex justify-between items-center">
      <Link to={"/"}>
        <h1 className="text-4xl text-teal-600 font-bold duration-200">
          Dnote.io
        </h1>
      </Link>
      <div>
        <Link
          to={"/create"}
          className="text-teal-600 border-2 border-teal-600 px-2 py-1 rounded hover:shadow-md hover:shadow-teal-200 active:scale-90 duration-200"
        >
          Create Note
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
