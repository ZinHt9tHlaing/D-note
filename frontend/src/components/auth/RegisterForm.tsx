import * as yup from "yup";
import { useRegisterMutation } from "../../store/slices/endpoint/authApi";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import StyledErrorMessage from "../StyledErrorMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
  };

  const RegisterFormSchema = yup.object({
    username: yup
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(10, "Username must be less than 10 characters")
      .required("Username is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address!"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await register(values).unwrap();
      resetForm();
      toast.success("User registration successful!");
      navigate("/login");
    } catch (err: any) {
      if (err?.status === 400) {
        resetForm({ values: { ...values, password: "" } });
        toast.error("User already exists!");
      } else {
        toast.error("User registration failed!");
      }
      console.error("Registration error:", err);
    }
  };

  return (
    <section className="px-10">
      <h1 className="text-2xl font-semibold mb-5 text-center">
        Create a new User.
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-3">
            {/* username */}
            <div>
              <label htmlFor="username" className="font-medium block">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="p-1 border-2 border-teal-600 text-gray-600 w-full rounded focus:outline-none"
              />
              <StyledErrorMessage name="username" />
            </div>
            {/* email */}
            <div>
              <label htmlFor="email" className="font-medium block">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="p-1 border-2 border-teal-600 text-gray-600 w-full rounded focus:outline-none"
              />
              <StyledErrorMessage name="email" />
            </div>
            {/* password */}
            <div>
              <label htmlFor="password" className="font-medium block">
                Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="p-1 pr-10 border-2 border-teal-600 w-full rounded focus:outline-none text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 active:scale-95 duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <StyledErrorMessage name="password" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex justify-center w-full items-center text-lg gap-2 text-white disabled:cursor-not-allowed disabled:bg-teal-700 disabled:border-teal-700 bg-teal-600 cursor-pointer py-1 px-2 rounded border-2 border-teal-600 active:scale-95 duration-200"
            >
              {isLoading && (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Register
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RegisterForm;
