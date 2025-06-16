import { Field, Form, Formik, type FormikHelpers } from "formik";
import StyledErrorMessage from "../StyledErrorMessage";
import { useLoginMutation } from "../../store/slices/endpoint/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await login(values).unwrap();
      resetForm();
      toast.success("Login successful!");
      navigate("/");
    } catch (err: any) {
      if (err?.status === 400) {
        resetForm({ values: { ...values, password: "" } });
        toast.error("User not found!");
      } else {
        toast.error("Login failed!");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <section className="px-10">
      <h1 className="text-2xl font-semibold mb-5 text-center">
        Login your account.
      </h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-3">
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
              Login
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default LoginForm;
