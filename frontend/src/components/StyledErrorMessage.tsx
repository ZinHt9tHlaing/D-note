import { ErrorMessage } from "formik";

type StyledErrorMessageProps = {
  name: string;
};

const StyledErrorMessage = ({ name }: StyledErrorMessageProps) => {
  return (
    <div className="text-red-600 font-medium font-mono">
      <ErrorMessage name={name} />
    </div>
  );
};

export default StyledErrorMessage;
