import { Field, Form, Formik, type FormikHelpers } from "formik";
import * as yup from "yup";
import {
  useGetDetailNoteQuery,
  useUpdateNoteMutation,
} from "../store/slices/endpoint/noteApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import StyledErrorMessage from "../components/StyledErrorMessage";

type FormValues = {
  note_id: string;
  title: string;
  description: string;
};

const EditNoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateNote, { isLoading }] = useUpdateNoteMutation();
  const { data: oldNote } = useGetDetailNoteQuery(id!);

  const initialValues: FormValues = {
    note_id: oldNote?._id || "",
    title: oldNote?.title || "",
    description: oldNote?.description || "",
  };

  const NoteFormSchema = yup.object({
    title: yup
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be less than 100 characters")
      .required("Title is required"),
    description: yup
      .string()
      .min(5, "Description must be at least 5 characters")
      .required("Description is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await updateNote({ id: id!, data: values }).unwrap();
      resetForm();
      toast.success("Note updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Failed to update note", err);
      toast.error("Note update failed!");
    }
  };

  return (
    <section className="px-10">
      <h1 className="text-2xl font-semibold mb-5 text-center">
        Edit your note.
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {() => (
          <Form className="space-y-3">
            <div>
              <Field
                type="text"
                id="note_id"
                name="note_id"
                className="p-1 border-2 hidden border-teal-600 w-full rounded focus:outline-none"
              />
              <StyledErrorMessage name="title" />
            </div>
            <div>
              <label htmlFor="title" className="font-medium block">
                Note Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="p-1 border-2 border-teal-600 w-full rounded focus:outline-none"
              />
              <StyledErrorMessage name="title" />
            </div>
            <div>
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
              disabled={isLoading}
            >
              {isLoading && (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Update
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default EditNoteForm;
