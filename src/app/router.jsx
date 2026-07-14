import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { authRoutes, publicRoutes, securedRoutes } from "@/routes/";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [...authRoutes, ...publicRoutes, ...securedRoutes],
  },
]);
