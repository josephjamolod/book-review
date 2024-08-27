import Button from "@mui/joy/Button";
import CardActions from "@mui/joy/CardActions";
import SendIcon from "@mui/icons-material/Send";

import Axios from "axios";
import { BookDataType } from "../pages/UpdateBook";
import config from "../config";
import { useState } from "react";

export default function EditBook({
  author,
  bookTitle,
  rating,
  reviewText,
  _id,
}: BookDataType) {
  // console.log(author, bookTitle, rating, reviewText);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const updateBook = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await Axios.patch(
        `${config.apiUrl}/books/update-book/${_id}`,
        { author, bookTitle, rating, reviewText },
        { withCredentials: true }
      );
      // console.log(response.data);
      setLoading(false);
      return;
    } catch (err) {
      // console.log(err);
      if (Axios.isAxiosError(err)) {
        const { message } = err.response?.data;
        console.log(message);
        if (message.includes("author")) {
          setLoading(false);
          setError("Author must not exceed 30 characters");
        } else if (message.includes("bookTitle")) {
          setLoading(false);
          setError("Book Title must not exceed 50 characters");
        } else if (message.includes("reviewText")) {
          console.log("red");

          setLoading(false);
          setError("Review Text must atleast 10 characters");
        } else {
          setLoading(false);
          setError(message);
        }
      } else {
        setLoading(false);
        setError(err instanceof Error && err.message);
      }
    }
  };

  return (
    <CardActions className="-mt-2 flex flex-col w-full">
      {loading ? (
        <Button
          loading
          loadingPosition="end"
          className="w-full"
          endDecorator={<SendIcon />}
        >
          Updating
        </Button>
      ) : (
        <Button onClick={updateBook} variant="solid" className="w-full">
          Update Book
        </Button>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </CardActions>
  );
}
