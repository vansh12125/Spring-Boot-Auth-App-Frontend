import { Outlet } from "react-router-dom";
import AuthInitializer from "@/routes/AuthInitializer";
import {GuestRoutes} from "@/routes";

export default function AuthLayout() {
  return (
    <AuthInitializer>
      <GuestRoutes>
        
        <Outlet />
       
      </GuestRoutes>
    </AuthInitializer>
  );
}