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
import CreateGroupPage from "./pages/CreateGroupPage";
import EditGroupPage from "./pages/EditGroupPage";

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
        path: "/group",
        element: <GroupListPage />,
        // children: [
        //   {
        //     path: "create",
        //     element: <CreateGroupPage />,
        //   },
        // ],
      },
      {
        path: "/register", // Добавлено
        element: <RegisterPage />, // Добавлено
      },
      {
        path: "/group/create", // Добавлено
        element: <CreateGroupPage />, // Добавлено
      },
      {
        path: "/group/:id/update", // Добавлено
        element: <EditGroupPage />, // Добавлено
      },
      {
        path: "*",
        element: <GroupListPage />,
      },
    ],
  },
];

export const AppRoutes: React.FC = () => {
  const routeResult = useRoutes(routes);

  return <>{routeResult}</>;
};
