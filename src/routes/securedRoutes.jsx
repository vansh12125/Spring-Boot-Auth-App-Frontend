import { ProfileDashboard, EditProfile,CreatePost,Feeds ,MyPosts,EditPost} from "@/pages/secure";

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
  {
    path: "my-posts",
    element: <MyPosts />,
  },
  {
    path: "edit-post/:postId",
    element: <EditPost />,
  },
];
