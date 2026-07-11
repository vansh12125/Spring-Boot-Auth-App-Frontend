import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { authRoutes, publicRoutes } from "@/routes/";

export const router = createBrowserRouter([
  { 
    element: <MainLayout />,
    children: 
     [
        ...authRoutes,
        ...publicRoutes
     ] },
]);
