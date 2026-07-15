import { ProfileDashboard, EditProfile } from "@/pages/secure";

export const securedRoutes = [
  {
    path: "dashboard",
    element: <ProfileDashboard />,
  },
  {
    path: "edit-profile",
    element: <EditProfile />,
  },
];
