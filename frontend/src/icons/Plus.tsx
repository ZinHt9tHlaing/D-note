import { Link } from "react-router";
import { PlusIcon } from "@heroicons/react/16/solid";

const Plus = () => {
  return (
    <Link
      to={"/create"}
      className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center fixed bottom-28 right-10 md:right-40 cursor-pointer active:scale-90 duration-200"
    >
      <PlusIcon width={30} height={30} />
    </Link>
  );
};

export default Plus;
