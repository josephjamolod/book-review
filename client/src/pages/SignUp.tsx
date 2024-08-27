import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button as SubmitButton } from "@mui/material";
import Button from "@mui/joy/Button";
import Axios from "axios";
import config from "../config";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Please provide a username"),
  email: yup
    .string()
    .required("Please provide an email")
    .email("Please provide a valid email"),
  password: yup
    .string()
    .required("Please provide a password")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

export default function SignUp() {
  const { currentUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [error, setError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);
      const response = await Axios.post(`${config.apiUrl}/auth/sign-up`, data);
      const userInfo = response.data;
      console.log(userInfo);
      setLoading(false);
      setError(false);
      navigate("/sign-in");
    } catch (err) {
      if (Axios.isAxiosError(err)) {
        const {
          message,
        }: { message: string; statusCode: number; success: boolean } =
          err.response?.data;
        console.log(message);

        if (message.includes("duplicate key")) {
          setLoading(false);
          setError("Username already taken");
        } else {
          setLoading(false);
          setError(message);
        }
        // console.log(err.message);
      } else {
        console.log(err);
        setLoading(false);
        setError(err instanceof Error && err.message);
      }
    }
  };

  return currentUser ? (
    <Navigate to={"/"} />
  ) : (
    <div className="flex justify-center h-screen items-start pt-20">
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
              {...register("username")}
              className="outline-none border-2 rounded-md px-2 py-2 text-slate-500 w-full focus:border-blue-300"
              placeholder="Username"
              id="username"
              type="text"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("email")}
              className="outline-none border-2 rounded-md px-2 py-2 text-slate-500 w-full focus:border-blue-300"
              placeholder="Email"
              id="email"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("password")}
              className="outline-none border-2 rounded-md px-2 py-2 text-slate-500 w-full focus:border-blue-300"
              placeholder="Password"
              id="password"
              type="password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("confirmPassword")}
              className="outline-none border-2 rounded-md px-2 py-2 text-slate-500 w-full focus:border-blue-300"
              placeholder="Confirm Password"
              id="confirmPassword"
              type="password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          {loading ? (
            <Button className="w-full border " loading loadingPosition="start">
              Signing up
            </Button>
          ) : (
            <SubmitButton type="submit" className="w-full" variant="contained">
              Sign Up
            </SubmitButton>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}

          <p className="flex justify-center space-x-1">
            <span className="text-slate-700">Already have an account?</span>
            <Link className="text-blue-500 hover:underline" to="/sign-in">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
