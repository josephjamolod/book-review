import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Rating from "@mui/material/Rating";
import Textarea from "@mui/joy/Textarea";
import { Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { useState } from "react";
import config from "../config";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggle } from "../redux/user/userSlice";

const schema = yup.object().shape({
  bookTitle: yup
    .string()
    .required("Please provide a book title")
    .max(50, "Book Title must not exceed 50 characters"),
  author: yup
    .string()
    .required("Please provide a book author")
    .max(30, "Book Author must not exceed 30 characters"),
  reviewText: yup
    .string()
    .required("Please provide a book review")
    .min(10, "Book review must atleast 10 characters"),
  rating: yup
    .number()
    .required("Please provide a rating")
    .max(5, "5 max only")
    .min(1, "minimum of 1 star"),
});

export interface FormData {
  bookTitle: string;
  author: string;
  reviewText: string;
  rating: number;
}

export default function CreateBook() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [rate, setRate] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log(data);
    try {
      setLoading(true);
      const response = await Axios.post(
        `${config.apiUrl}/books/create-book/${currentUser?._id}`,
        data,
        { withCredentials: true }
      );
      // console.log(response.data);

      dispatch(toggle(new Date()));
      reset();
      setRate(0);
      setTimeout(() => {
        setCreated(true);
        setTimeout(() => {
          setCreated(false);
        }, 1500);
      }, 1500);
      setLoading(false);
    } catch (err) {
      // console.log(err);
      if (err instanceof Error) {
        console.log(err.message);
        setLoading(false);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {created && (
        <Alert className=" -mb-9 -mt-3 " variant="outlined" severity="success">
          Book created successfully
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 ">
        <Card
          className="px-7 md:px-5"
          variant="solid"
          color="primary"
          invertedColors
          sx={{
            boxShadow: "lg",
            width: 400,
            maxWidth: "100%",
            // to make the demo resizeable
            overflow: "auto",
            resize: "horizontal",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip className="min-w-[70px] " size="sm" variant="soft">
              Rating:
            </Chip>

            <Rating
              onChange={(_, newValue) => {
                if (newValue !== null) {
                  setValue("rating", newValue);
                  setRate(newValue);
                } else {
                  setRate(0);
                  setValue("rating", 0);
                }
              }}
              name="no-value"
              value={rate}
            />
          </Box>
          {errors.rating && (
            <p className="text-center text-red-500  text-sm">
              {errors.rating.message}
            </p>
          )}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip className="min-w-[70px]" size="sm" variant="soft">
              Book Title:
            </Chip>
            <div>
              <Input
                {...register("bookTitle")}
                className="text-white"
                placeholder="Book Title"
              />
            </div>
          </Box>
          {errors.bookTitle && (
            <p className="text-center text-red-500  text-sm">
              {errors.bookTitle.message}
            </p>
          )}
          <CardContent>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip className="min-w-[70px]" size="sm" variant="soft">
                Author:
              </Chip>
              <div>
                <Input
                  {...register("author")}
                  className="text-white"
                  placeholder="Author"
                />
              </div>
            </Box>
            {errors.author && (
              <p className="text-center text-red-500  text-sm">
                {errors.author.message}
              </p>
            )}
            <label className="mt-2 px-2">Book Review :</label>
            <Textarea
              {...register("reviewText")}
              className=" bg-white text-[#1976d2]"
              placeholder="Type in here…"
              minRows={2}
              sx={{
                "&::before": {
                  display: "none",
                },
                "&:focus-within": {
                  outline: "2px solid var(--Textarea-focusedHighlight)",
                  outlineOffset: "2px",
                },
              }}
            />
          </CardContent>
          {errors.reviewText && (
            <p className="text-center text-red-500  text-sm">
              {errors.reviewText.message}
            </p>
          )}
          <CardActions className="-mt-2">
            {loading ? (
              <Button loading loadingPosition="end" endDecorator={<SendIcon />}>
                Creating
              </Button>
            ) : (
              <Button type="submit" variant="solid">
                Create Book
              </Button>
            )}
          </CardActions>
        </Card>
      </form>
    </div>
  );
}
