import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-slate-100 py-2 px-1 mb-10">
      <Link to={"/"}>
        <h1 className="text-4xl text-teal-600 font-bold duration-200">
          Dnote.io
        </h1>
      </Link>
    </nav>
  );
};

export default Navbar;
