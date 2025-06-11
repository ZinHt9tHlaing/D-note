import { Field, Form, Formik } from "formik";
import * as yup from "yup";

// formik custom error message
import StyledErrorMessage from "./StyledErrorMessage";

type NoteFormProps = {
  isCreate: boolean;
};

type FormValues = {
  title: string;
  description: string;
};

const NoteForm = ({ isCreate }: NoteFormProps) => {
  const initialValues: FormValues = { title: "", description: "" };

  // const validate = (values: FormValues) => {
  //   const error = {};

  //   if (values.title === "") {
  //     error.title = "Please enter a title";
  //   }

  //   if (values.description === "") {
  //     error.description = "Please enter a description";
  //   }
  //   return error;
  // };

  const NoteFormSchema = yup.object({
    title: yup
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(30, "Title must be less than 30 characters")
      .required("Title is required"),
    description: yup
      .string()
      .min(5, "Description must be at least 5 characters")
      .required("Description is required"),
  });

  const handleSubmit = (values: FormValues) => {
    console.log("Form values:", values);
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-5 text-center">
        {isCreate ? "Create a new note." : "Edit your note."}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form className="space-y-3">
            <div className="">
              <label htmlFor="title" className="font-medium block">
                Note Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="p-1 border-2 border-teal-600 w-full rounded focus:outline-none"
              />
              {/* {errors.title && <p className="text-red-600">{errors.title}</p>} */}
              <StyledErrorMessage name="title" />
            </div>
            <div className="">
              <label htmlFor="description" className="font-medium block">
                Note Description
              </label>
              <Field
                as="textarea"
                rows={4}
                id="description"
                name="description"
                className="p-1 border-2 border-teal-600 w-full rounded focus:outline-none"
              />
              <StyledErrorMessage name="description" />
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
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
