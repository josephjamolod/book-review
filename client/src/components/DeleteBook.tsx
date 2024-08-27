import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";

import Axios from "axios";
import config from "../config";
import { useAppDispatch } from "../redux/hooks";
import { toggle } from "../redux/user/userSlice";
import { useState } from "react";

export default function DeleteBook({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const deleteBook = async () => {
    // console.log(id);
    try {
      setLoading(true);
      const response = await Axios.delete(
        `${config.apiUrl}/books/delete-book/${id}`,
        { withCredentials: true }
      );
      // console.log(response.data);
      dispatch(toggle(new Date()));
      setLoading(false);
      return;
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return loading ? (
    <AutoDeleteIcon className="text-[#6e6e6e] -mr-2" />
  ) : (
    <Tooltip onClick={deleteBook} title="Delete">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
