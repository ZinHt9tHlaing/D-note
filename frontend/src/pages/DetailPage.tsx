import { Link } from "react-router";

const DetailPage = () => {
  return (
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
        <h3 className="text-3xl font-semibold mb-2">Hello</h3>
        <p className="text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          neque corrupti repellendus deserunt, nemo iure velit dolores
          dignissimos esse illo qui error, aspernatur asperiores eveniet, eius
          cumque! Delectus, illo numquam.
        </p>
      </div>
    </section>
  );
};

export default DetailPage;
