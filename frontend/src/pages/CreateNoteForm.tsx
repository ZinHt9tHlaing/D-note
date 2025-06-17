import { Field, Form, Formik, type FormikHelpers } from "formik";
import * as yup from "yup";

// formik custom error message
import { useCreateNoteMutation } from "../store/slices/endpoint/noteApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import StyledErrorMessage from "../components/StyledErrorMessage";
import { useRef, useState } from "react";
import { HardDriveUpload } from "lucide-react";

type FormValues = {
  title: string;
  description: string;
  cover_image: string;
};

const CreateNoteForm = () => {
  const navigate = useNavigate();
  const [previewImg, setPreviewImg] = useState<null | string>(null);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [createNote, { isLoading }] = useCreateNoteMutation();

  const initialValues: FormValues = {
    title: "",
    description: "",
    cover_image: "",
  };

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
      await createNote(values).unwrap();
      resetForm();
      toast.success("Note create successful!");
      navigate("/");
    } catch (err) {
      console.error("Failed to create post", err);
      toast.error("Note create failed!");
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const selectedImage = event.target.files![0];
    if (selectedImage) {
      // console.log("files", event.target.files[0]);
      setPreviewImg(URL.createObjectURL(selectedImage));
      setFieldValue("cover_image", selectedImage);
    }
  };

  const clearPreviewImg = (
    setFieldValue: (field: string, value: any) => void
  ) => {
    setPreviewImg(null);
    setFieldValue("cover_image", null);
    fileRef.current!.value = "";
  };

  return (
    <section className="px-10">
      <h1 className="text-2xl font-semibold mb-5 text-center">
        Create a new note.
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-3">
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
              {/* {errors.title && <p className="text-red-600">{errors.title}</p>} */}
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
                    className="text-base font-medium text-red-600 cursor-pointer select-none"
                    onClick={() => clearPreviewImg(setFieldValue)}
                  >
                    Clear
                  </p>
                )}
              </div>
              {isUpload ? (
                <p
                  className="text-base font-medium text-red-600 cursor-pointer select-none active:scale-95 duration-200"
                  onClick={() => setIsUpload(false)}
                >
                  Disable cover image
                </p>
              ) : (
                <p
                  className="text-base font-medium underline text-teal-600 cursor-pointer select-none active:scale-95 duration-200"
                  onClick={() => setIsUpload(true)}
                >
                  Upload cover image here
                </p>
              )}
              {isUpload && (
                <>
                  {" "}
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
                    {previewImg && (
                      <img
                        src={previewImg!}
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
            >
              {isLoading && (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Create
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default CreateNoteForm;
