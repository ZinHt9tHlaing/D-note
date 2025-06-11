import NoteForm from "../components/NoteForm";

const CreatePage = () => {
  return (
    <section className="px-10">
      <NoteForm isCreate={true} />
    </section>
  );
};

export default CreatePage;
