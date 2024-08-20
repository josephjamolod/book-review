import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//component
import RootLayout from "./components/RootLayout";

//pages
import DashBoard from "./pages/DashBoard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<DashBoard />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
