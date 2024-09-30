import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import config from "../config";

import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Rating from "@mui/material/Rating";
import Textarea from "@mui/joy/Textarea";
import { Input } from "@mui/material";
import { type FormData } from "../components/CreateBook";
import EditBook from "../components/EditBook";

export interface BookDataType extends FormData {
  _id: string;
}

export default function UpdateBook() {
  const { id } = useParams();
  const [userData, setUserData] = useState<null | BookDataType>(null);
  // console.log(userData);

  const fetchBook = async () => {
    try {
      const response = await Axios.get(
        `${config.apiUrl}/books/get-single-book/${id}`,
        { withCredentials: true }
      );
      // console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleRatingChange = (
    _: React.SyntheticEvent,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      setUserData((prevData) => ({
        ...prevData!,
        rating: newValue,
      }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center text-slate-400 text-4xl font-bold mt-10 mb-5">
        Edit Book
      </h1>
      <form className="">
        <Card
          variant="solid"
          color="primary"
          invertedColors
          sx={{
            boxShadow: "lg",
            width: 400,
            maxWidth: "100%",
            overflow: "auto",
            resize: "horizontal",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip className="min-w-[70px]" size="sm" variant="soft">
              Rating:
            </Chip>
            <Rating
              name="rating"
              value={userData?.rating ?? 0}
              onChange={handleRatingChange}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip className="min-w-[70px]" size="sm" variant="soft">
              Book Title:
            </Chip>
            <div>
              <Input
                name="bookTitle"
                value={userData?.bookTitle ?? ""}
                className="text-white"
                placeholder="Book Title"
                onChange={handleInputChange}
              />
            </div>
          </Box>

          <CardContent>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip className="min-w-[70px]" size="sm" variant="soft">
                Author:
              </Chip>
              <div>
                <Input
                  name="author"
                  value={userData?.author ?? ""}
                  className="text-white"
                  placeholder="Author"
                  onChange={handleInputChange}
                />
              </div>
            </Box>

            <label className="mt-2 px-2">Book Review :</label>
            <Textarea
              name="reviewText"
              className="bg-white text-[#1976d2]"
              placeholder="Type in here…"
              minRows={2}
              value={userData?.reviewText ?? ""}
              onChange={handleInputChange}
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

          <EditBook
            author={userData?.author!}
            bookTitle={userData?.bookTitle!}
            rating={userData?.rating!}
            reviewText={userData?.reviewText!}
            _id={userData?._id!}
          />
        </Card>
      </form>
    </div>
  );
}
