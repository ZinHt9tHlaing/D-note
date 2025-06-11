import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { Link } from "react-router";

const Notes = () => {
  return (
    <div className="w-4/5 md:w-2/5 p-3 border-t-4 border-t-teal-600 shadow-lg">
      <h3 className="text-xl font-semibold mb-2">Hello</h3>
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        neque corrupti repellendus deserunt, nemo iure velit dolores dignissimos
        esse illo qui error, aspernatur asperiores eveniet, eius cumque!
        Delectus, illo numquam.
      </p>
      <div className="flex items-center justify-end gap-2 mt-3">
        <TrashIcon width={20} height={20} className="text-red-600" />
        <Link to={"/edit/1"}>
          <PencilSquareIcon
            width={22}
            height={22}
            className="text-teal-600 active:scale-90 duration-200"
          />
        </Link>
        <Link to={"/notes/1"}>
          <EyeIcon
            width={25}
            height={25}
            className="active:scale-90 duration-200"
          />
        </Link>
      </div>
    </div>
  );
};

export default Notes;
