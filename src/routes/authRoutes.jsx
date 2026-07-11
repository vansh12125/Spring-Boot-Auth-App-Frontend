import { Login, Register } from "@/pages/auth";

export const authRoutes = [
  {
    path: "signin",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Register />,
  },
];
