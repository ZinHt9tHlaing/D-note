type NoteFormProps = {
  isCreate: boolean;
};

const NoteForm = ({ isCreate }: NoteFormProps) => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-5 text-center">
        {isCreate ? "Create a new note." : "Edit your note."}
      </h1>
      <form className="space-y-3">
        <div className="">
          <label htmlFor="title" className="font-medium block">
            Note Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="p-1 border-2 border-teal-600 w-full rounded focus:outline-none"
          />
        </div>
        <div className="">
          <label htmlFor="description" className="font-medium block">
            Note Description
          </label>
          <textarea
            rows={4}
            id="description"
            name="description"
            className="p-1 border-2 border-teal-600 w-full rounded focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="flex justify-center w-full items-center text-lg gap-2 text-white disabled:cursor-not-allowed disabled:bg-teal-700 bg-teal-600 cursor-pointer py-1 px-2 rounded border-2 border-teal-600 active:scale-95 duration-200"
        >
          {/* {isLoading && (
        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        )} */}
          {isCreate ? "Create" : "Update"}
        </button>
      </form>
    </section>
  );
};

export default NoteForm;
