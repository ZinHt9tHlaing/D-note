import { createBrowserRouter } from "react-router";
import CreateNoteForm from "../pages/CreateNoteForm";
import EditNoteForm from "../pages/EditNoteForm";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import ErrorMessage from "../components/ErrorMessage";
import RegisterForm from "../components/auth/RegisterForm";
import LoginForm from "../components/auth/LoginForm";


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
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
    ],
  },
]);
