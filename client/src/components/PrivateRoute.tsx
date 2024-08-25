import { Outlet, Navigate } from "react-router-dom";

//redux
import { useAppSelector } from "../redux/hooks";

export default function PrivateRoute() {
  const { currentUser } = useAppSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />;
}
