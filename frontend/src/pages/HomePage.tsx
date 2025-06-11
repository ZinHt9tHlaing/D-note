import Notes from "../components/Notes";
import Plus from "../icons/Plus";

const HomePage = () => {
  return (
    <section className="flex flex-wrap gap-6 justify-center">
      <Notes />
      <Notes />
      <Notes />
      <Notes />
      <Plus />
    </section>
  );
};

export default HomePage;
