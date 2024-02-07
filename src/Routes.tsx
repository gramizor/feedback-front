// AppRoutes.tsx
import { RouteObject, useRoutes } from "react-router-dom";
import GroupListPage from "./pages/GroupListPage";
import GroupDetailsPage from "./pages/GroupDetailsPage";
import AuthPage from "./pages/AuthPage";
import FeedbackDetailsPage from "./pages/FeedbackDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import FeedbackListPage from "./pages/FeedbackListPage";
import { MainLayout } from "./components/MainLayout/MainLayout";

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <GroupListPage />,
      },
      {
        path: "/group/:id",
        element: <GroupDetailsPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/feedback",
        element: <FeedbackListPage />,
      },
      {
        path: "/feedback/:id",
        element: <FeedbackDetailsPage />,
      },
      {
        path: "/group", // Добавлено
        element: <GroupListPage />, // Добавлено
      },
      {
        path: "/register", // Добавлено
        element: <RegisterPage />, // Добавлено
      },
      {
        path: "*",
        element: <HomePage />,
      },
    ],
  },
];

export const AppRoutes: React.FC = () => {
  const routeResult = useRoutes(routes);

  return <>{routeResult}</>;
};
