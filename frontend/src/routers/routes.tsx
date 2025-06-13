import { createBrowserRouter } from "react-router";
import CreateNoteForm from "../pages/CreateNoteForm";
import EditNoteForm from "../pages/EditNoteForm";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import ErrorMessage from "../components/ErrorMessage";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorMessage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/create",
        element: <CreateNoteForm />,
      },
      {
        path: "/edit/:id",
        element: <EditNoteForm />,
      },
      {
        path: "/note/:id",
        element: <DetailPage />,
      },
    ],
  },
]);
