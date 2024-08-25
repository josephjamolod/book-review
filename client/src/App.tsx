import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//component
import RootLayout from "./components/RootLayout";
import PrivateRoute from "./components/PrivateRoute";

//pages
import DashBoard from "./pages/DashBoard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProfileDashboard from "./pages/ProfileDashboard";
import UpdateBook from "./pages/UpdateBook";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<DashBoard />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="main" element={<PrivateRoute />}>
          <Route index element={<ProfileDashboard />} />
          <Route path="update-book/:id" element={<UpdateBook />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
