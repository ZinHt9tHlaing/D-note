import { Link, useParams } from "react-router";
import Loading from "../components/Loading";
import { CalendarDays } from "lucide-react";
import { UserIcon } from "@heroicons/react/16/solid";
import { useGetDetailNoteQuery } from "../store/slices/endpoint/noteApi";

const DetailPage = () => {
  const { id } = useParams();
  const { data: note, isLoading } = useGetDetailNoteQuery(id!);

  const formattedDate = note?.createdAt
    ? new Date(note.createdAt).toISOString().split("T")[0]
    : "";

  return (
    <>
      {isLoading && <Loading name="Note" />}
      <section className="px-10">
        <div className="flex justify-end items-center">
          <Link
            to={"/"}
            className="bg-white text-teal-600 border-2 border-teal-600 px-2 py-1 rounded hover:bg-slate-100 active:scale-90 duration-200"
          >
            Back
          </Link>
        </div>
        <div className="mt-5 p-3 border-t-4 border-t-teal-600 shadow-lg">
          <h3 className="text-3xl font-semibold mb-2">{note?.title}</h3>
          <div className="my-2">
            <p className="flex gap-1 text-sm font-medium text-gray-600">
              <UserIcon className="size-4" /> {note?.creator}
            </p>
            <p className="flex gap-1 text-sm font-medium text-gray-600">
              <CalendarDays className="size-4" /> {formattedDate}
            </p>
          </div>
          <p className="text-base text-slate-700">{note?.description}</p>
        </div>
      </section>
    </>
  );
};

export default DetailPage;
