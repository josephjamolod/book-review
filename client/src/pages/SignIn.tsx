import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button as SubmitButton } from "@mui/material";
import Button from "@mui/joy/Button";

import Axios from "axios";
import config from "../config";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  signInUserFailure,
  signInUserStart,
  signInUserSuccess,
} from "../redux/user/userSlice";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please provide an email")
    .email("Please provide a valid email"),
  password: yup.string().required("Please provide a password"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, currentUser, loading } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      dispatch(signInUserStart(true));
      const response = await Axios.post(`${config.apiUrl}/auth/sign-in`, data, {
        withCredentials: true,
      });
      const userInfo = response.data;
      console.log(userInfo);
      dispatch(signInUserSuccess(userInfo));
      navigate("/");
    } catch (err) {
      if (Axios.isAxiosError(err)) {
        console.log(err);
        const {
          message,
        }: { message: string; statusCode: number; success: boolean } =
          err.response?.data;
        console.log(message);

        if (message.includes("duplicate key")) {
          dispatch(signInUserFailure("Username already taken"));
        } else {
          dispatch(signInUserFailure(message));
        }
        // console.log(err.message);
      } else {
        console.log(err);
        dispatch(signInUserFailure(err instanceof Error && err.message));
      }
    }
  };
  return currentUser ? (
    <Navigate to={"/"} />
  ) : (
    <div className=" flex justify-center h-screen items-start pt-20 ">
      <div className="w-[400px] rounded-lg border border-slate-200 h-auto py-6 px-12 bg-slate-100 relative overflow-hidden shadow-md">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h2 className="text-2xl font-medium text-slate-700">Register</h2>
          <p className="text-slate-500">Enter details below.</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-4 space-y-3 md:space-y-6"
        >
          <div>
            <input
              {...register("email")}
              className="outline-none border-2 rounded-md px-2 py-3 text-slate-500 w-full focus:border-blue-300"
              placeholder="Email"
              id="email"
              name="email"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("password")}
              className="outline-none border-2 rounded-md px-2 py-3 text-slate-500 w-full focus:border-blue-300"
              placeholder="Password"
              id="password"
              name="password"
              type="password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {!loading ? (
            <SubmitButton
              type="submit"
              className="w-full py-3 text-md"
              variant="contained"
            >
              Sign In
            </SubmitButton>
          ) : (
            <Button className="w-full border " loading loadingPosition="start">
              Signing In
            </Button>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}
          {loading && <p>loading...</p>}
          <p className="flex justify-center space-x-1">
            <span className="text-slate-700"> Already have an account? </span>
            <Link className="text-blue-500 hover:underline" to="/sign-up">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
