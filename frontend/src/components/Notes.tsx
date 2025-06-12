import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router";

type NoteFormProps = {
  note: {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
  };
};

const Notes = ({ note }: NoteFormProps) => {
  return (
    <div
      key={note._id}
      className="w-4/5 md:w-full mx-auto h-fit px-5 py-3 border-t-4 border-t-teal-600 shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
      <p className="text-sm line-clamp-3 text-slate-600">{note.description}</p>
      <div className="flex items-center justify-between mt-3 border-t border-t-teal-600 pt-2">
        <p className="text-sm font-medium">
          {formatISO9075(new Date(note.createdAt), { representation: "date" })}
        </p>
        <div className="flex items-center justify-end gap-2">
          <TrashIcon width={20} height={20} className="text-red-600" />
          <Link to={"/edit/1"}>
            <PencilSquareIcon
              width={22}
              height={22}
              className="text-teal-600 active:scale-90 duration-200"
            />
          </Link>
          <Link to={`/note/${note._id}`}>
            <EyeIcon
              width={25}
              height={25}
              className="active:scale-90 duration-200"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notes;
