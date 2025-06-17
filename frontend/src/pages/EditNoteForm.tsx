import { Field, Form, Formik, type FormikHelpers } from "formik";
import * as yup from "yup";
import {
  useGetDetailNoteQuery,
  useUpdateNoteMutation,
} from "../store/slices/endpoint/noteApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import StyledErrorMessage from "../components/StyledErrorMessage";
import { HardDriveUpload } from "lucide-react";
import { useRef, useState } from "react";

type FormValues = {
  note_id: string;
  title: string;
  description: string;
  cover_image: File | string;
};

const EditNoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [previewImg, setPreviewImg] = useState<null | string>(null);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [updateNote, { isLoading }] = useUpdateNoteMutation();
  const { data: oldNote } = useGetDetailNoteQuery(id!);

  const initialValues: FormValues = {
    note_id: oldNote?._id || "",
    title: oldNote?.title || "",
    description: oldNote?.description || "",
    cover_image: oldNote?.cover_image || "",
  };

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

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
    cover_image: yup
      .mixed()
      .nullable()
      .test("FILE_FORMAT", "File format is not supported", (value) => {
        if (!value) return true;
        if (value instanceof File) {
          return SUPPORTED_FORMATS.includes(value.type);
        }
        return false;
      }),
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

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const selectedImage = event.target.files![0];
    if (selectedImage) {
      setPreviewImg(URL.createObjectURL(selectedImage));
      setFieldValue("cover_image", selectedImage);
    }
  };

  const clearPreviewImg = (
    setFieldValue: (field: string, value: any) => void
  ) => {
    setPreviewImg(null);
    setFieldValue("cover_image", null);
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
        {({ setFieldValue }) => (
          <Form className="space-y-3">
            {/* note_id */}
            <div>
              <Field
                type="text"
                id="note_id"
                name="note_id"
                className="p-1 border-2 hidden border-teal-600 w-full rounded focus:outline-none"
              />
              <StyledErrorMessage name="title" />
            </div>
            {/* title */}
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
            {/* description */}
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
            {/* cover_image */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="cover_image" className="font-medium block">
                  Cover Image <span className="text-xs">( optional )</span>
                </label>
                {previewImg && (
                  <p
                    className="text-base font-medium text-red-600 cursor-pointer select-none active:scale-95 duration-200"
                    onClick={() => clearPreviewImg(setFieldValue)}
                  >
                    Clear
                  </p>
                )}
              </div>
              {!isUpload && oldNote?.cover_image ? (
                <p
                  className="text-base font-medium text-red-600 cursor-pointer select-none active:scale-95 duration-200"
                  onClick={() => setIsUpload(true)}
                >
                  Disable cover image
                </p>
              ) : (
                <p
                  className="text-base font-medium underline text-teal-600 cursor-pointer select-none active:scale-95 duration-200"
                  onClick={() => setIsUpload(false)}
                >
                  Upload cover image here
                </p>
              )}
              {!isUpload && oldNote?.cover_image && (
                <>
                  <input
                    type="file"
                    id="cover_image"
                    name="cover_image"
                    ref={fileRef}
                    onChange={(event) =>
                      handleImageChange(event, setFieldValue)
                    }
                    hidden
                  />
                  <div
                    className="flex items-center justify-center cursor-pointer border-2 border-dashed border-teal-600 text-teal-600 py-1 rounded h-50 active:scale-95 duration-300 relative overflow-hidden"
                    onClick={() => fileRef.current?.click()}
                  >
                    <HardDriveUpload className="z-20" />
                    {oldNote?.cover_image && (
                      <img
                        src={
                          previewImg
                            ? previewImg
                            : `${import.meta.env.VITE_API_URL}/${
                                oldNote?.cover_image
                              }`!
                        }
                        alt="preview"
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-60 z-10"
                      />
                    )}
                  </div>
                </>
              )}
              <StyledErrorMessage name="cover_image" />
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
