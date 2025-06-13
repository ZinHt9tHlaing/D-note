import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router";
import { useDeleteNoteMutation } from "../store/slices/endpoint/noteApi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type NoteFormProps = {
  note: {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
  };
};

const Notes = ({ note }: NoteFormProps) => {
  const { _id, title, description, createdAt } = note;

  const [deleteNote] = useDeleteNoteMutation();

  const deleteNoteHandler = async () => {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this note?"
    // );

    // if (confirmDelete) {
    //   try {
    //     await deleteNote(_id).unwrap();
    //     toast.success("Note deleted successfully!");
    //   } catch (error) {
    //     console.error("Delete failed:", error);
    //     toast.error("Failed to delete note.");
    //   }
    // }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteNote(_id).unwrap();
        toast.success("Note deleted successfully!");
        Swal.fire("Deleted!", "Your note has been deleted.", "success");
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete note.");
      }
    }
  };

  return (
    <div
      key={_id}
      className="w-4/5 md:w-full mx-auto h-fit px-5 py-3 border-t-4 border-t-teal-600 shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm line-clamp-3 text-slate-600">{description}</p>
      <div className="flex items-center justify-between mt-3 border-t border-t-teal-600 pt-2">
        <p className="text-sm font-medium text-slate-700">
          {formatISO9075(new Date(createdAt), { representation: "date" })}
        </p>
        <div className="flex items-center justify-end gap-2">
          <TrashIcon
            width={20}
            height={20}
            onClick={deleteNoteHandler}
            className="text-red-600 cursor-pointer active:scale-90 duration-200"
          />
          <Link to={"/edit/1"}>
            <PencilSquareIcon
              width={22}
              height={22}
              className="text-teal-600 active:scale-90 duration-200"
            />
          </Link>
          <Link to={`/note/${_id}`}>
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
