import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";

const ErrorMessage = ({ message = "Something went wrong." }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-600 px-4">
      <AlertTriangle className="w-16 h-16 mb-4 text-red-500" />
      <h2 className="text-2xl font-semibold mb-2">Oops!</h2>
      <p className="mb-6 text-center max-w-md">{message}</p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 cursor-pointer bg-white border border-red-400 text-red-600 rounded-lg active:scale-90 hover:bg-red-100 duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
