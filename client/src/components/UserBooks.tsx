import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";

import { useEffect, useState } from "react";
import Axios from "axios";
import config from "../config";
import { useAppSelector } from "../redux/hooks";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface BooksType {
  author: string;
  bookTitle: string;
  createdAt: string;
  rating: number;
  reviewText: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export default function UserBooks() {
  const { currentUser, toggle } = useAppSelector((state) => state.user);
  const [books, setBooks] = useState<null | BooksType[]>(null);
  const urlParams = new URLSearchParams(window.location.search);

  // const fetchUser = async () => {
  //   const response = await Axios.get(
  //     `${config.apiUrl}/auth/get-user/${currentUser?._id}`,
  //     {
  //       withCredentials: true, // This is crucial for sending cookies with the request
  //     }
  //   );
  //   console.log(response?.data);
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  const fetchBooks = async () => {
    try {
      const response = await Axios.get(
        `${config.apiUrl}/books/get-user-books/${
          currentUser?._id
        }/?${urlParams.toString()}`,
        {
          withCredentials: true,
        }
      );
      const data: BooksType[] = response.data;
      // console.log(response.data);
      setBooks(data);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    // console.log(urlParams.toString());
    fetchBooks();
  }, [window.location.search]);

  return (
    <div className="px-10 w-full">
      <TableContainer className=" mx-auto shadow-lg " component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Book Review</StyledTableCell>
              <StyledTableCell className="font-semibold" align="left">
                Book Title
              </StyledTableCell>
              <StyledTableCell align="left">Author</StyledTableCell>
              <StyledTableCell align="left">Star rating</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books &&
              books.map((book) => (
                <StyledTableRow key={book._id}>
                  <StyledTableCell component="th" scope="row">
                    {book.reviewText}
                  </StyledTableCell>
                  <StyledTableCell className="font-semibold" align="left">
                    {book.bookTitle}
                  </StyledTableCell>
                  <StyledTableCell align="left">{book.author}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Rating name="no-value" value={book.rating} readOnly />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
