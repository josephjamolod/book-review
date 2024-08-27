import Input from "@mui/joy/Input";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/joy/Button";
import UserBooks from "../components/UserBooks";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Axios from "axios";
import config from "../config";
import { useState } from "react";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

interface UserData {
  username: string;
  email: string;
}

export default function ProfileDashboard() {
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector((state) => state.user);
  const [data, setData] = useState<UserData | null>({
    username: currentUser?.username!,
    email: currentUser?.email!,
  });
  // console.log(data);

  const updateUser = async () => {
    try {
      dispatch(updateUserStart(true));
      const response = await Axios.patch(
        `${config.apiUrl}/auth/update-user/${currentUser?._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      dispatch(updateUserSuccess(response.data));
    } catch (err) {
      if (Axios.isAxiosError(err)) {
        console.log(err);
        const {
          message,
        }: { message: string; statusCode: number; success: boolean } =
          err.response?.data;
        console.log(message);

        if (message.includes("duplicate key") && message.includes("email")) {
          dispatch(updateUserFailure("Email already taken"));
        } else {
          dispatch(updateUserFailure(message));
        }
        // console.log(err.message);
      } else {
        console.log(err);
        dispatch(updateUserFailure(err instanceof Error && err.message));
      }
    }
  };
  return (
    <div className="pt-10 md:pt-20 flex flex-col md:flex-row items-center md:items-start">
      <div className="flex flex-shrink mb-5">
        <div className="border-slate-200 relative flex  w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg border ">
          <div className="flex flex-col justify-center p-5 relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {currentUser?.username}
            </h5>
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              {currentUser?.email}
            </p>
          </div>
          <div className="flex flex-col gap-y-3 p-6">
            <Input
              onChange={(e) =>
                setData({ ...data!, username: e.currentTarget.value })
              }
              className="border border-blue-400"
              size="md"
              placeholder="Username"
            />
            <Input
              onChange={(e) =>
                setData({ ...data!, email: e.currentTarget.value })
              }
              className="border border-blue-400"
              size="md"
              placeholder="Email"
            />
          </div>
          <div className="p-6 pt-0">
            {!loading ? (
              <button
                onClick={updateUser}
                data-ripple-light="true"
                type="button"
                className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Update Profile
              </button>
            ) : (
              <Button loading loadingPosition="end" endDecorator={<SendIcon />}>
                Updating
              </Button>
            )}

            {error && <p className="text-red-500 text-start">{error}</p>}
          </div>
        </div>
      </div>

      <h1 className="text-center text-slate-400 text-2xl font-bold  mb-5 md:hidden">
        Your Books
      </h1>
      <UserBooks />
    </div>
  );
}
