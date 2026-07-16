import { ProfileDashboard, EditProfile,CreatePost,Feeds } from "@/pages/secure";

export const securedRoutes = [
  {
    path: "dashboard",
    element: <ProfileDashboard />,
  },
  {
    path: "edit-profile",
    element: <EditProfile />,
  },
  {
    path: "create-post",
    element: <CreatePost />,
  },
  {
    path: "feed",
    element: <Feeds />,
  },
];
