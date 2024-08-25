import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function RootLayout() {
  return (
    <div className="overflow-hidden">
      <Header />
      <Outlet />
    </div>
  );
}
