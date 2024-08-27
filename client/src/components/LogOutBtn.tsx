import { Button as SubmitButton } from "@mui/material";
import Button from "@mui/joy/Button";
import Axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import config from "../config";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";

export default function LogOutBtn() {
  const dispatch = useAppDispatch();
  const { currentUser, loading } = useAppSelector((state) => state.user);

  const handleLogOut = async () => {
    try {
      dispatch(signOutUserStart(true));
      const response = await Axios.get(
        `${config.apiUrl}/auth/sign-out/${currentUser?._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      dispatch(signOutUserSuccess());
    } catch (err) {
      console.log(err);

      if (err instanceof Error) {
        console.log(err.message);
        dispatch(signOutUserFailure());
      }
      dispatch(signOutUserFailure());
    }
  };
  return !loading ? (
    <SubmitButton onClick={handleLogOut} variant="outlined">
      Log Out
    </SubmitButton>
  ) : (
    <Button className="w-full border " loading loadingPosition="end">
      Logging Out
    </Button>
  );
}
