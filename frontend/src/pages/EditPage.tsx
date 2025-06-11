import NoteForm from "../components/NoteForm";

 
const EditPage = () => {
  return (
    <section className="px-10">
      <NoteForm isCreate={false} />
    </section>
  );
}

export default EditPage