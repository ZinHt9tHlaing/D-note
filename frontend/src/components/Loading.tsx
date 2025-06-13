type LoadingProps = {
  name: string;
};

const Loading = ({ name }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-teal-600 text-xl animate-pulse">
        Loading {name}...
      </p>
    </div>
  );
};

export default Loading;
