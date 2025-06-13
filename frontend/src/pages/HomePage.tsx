import Notes from "../components/Notes";
import Plus from "../icons/Plus";
import Loading from "../components/Loading";
import { Link } from "react-router";
import { useGetNotesQuery } from "../store/slices/endpoint/noteApi";

const HomePage = () => {
  const { data: notes = [], isLoading } = useGetNotesQuery();

  const EmptyState = () => (
    <div className="w-full col-span-full flex flex-col items-center justify-center py-20 text-center text-gray-500">
      <p className="text-xl font-medium mb-2">No notes found</p>
      <p className="text-sm">
        Start by creating{" "}
        <Link
          to="/create"
          className="text-teal-600 underline active:scale-90 duration-200"
        >
          a new note.
        </Link>
      </p>
    </div>
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 transition-transform duration-300">
      {isLoading && <Loading name="Notes" />}
      {!isLoading && notes?.length === 0 && <EmptyState />}
      {!isLoading &&
        notes?.length > 0 &&
        notes?.map((note) => <Notes key={note._id} note={note} />)}
      <Plus />
    </section>
  );
};

export default HomePage;
