import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Search from "./Search";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-slate-100 h-20 flex items-center justify-between px-20">
      <h1>logo</h1>
      <Search />
      <ButtonGroup
        className="flex gap-x-14"
        variant="text"
        aria-label="Basic button group"
      >
        <Button variant="contained">
          <Link to={"/"}>Dashboard</Link>
        </Button>
        <div>
          <Button className="hover:underline hover:font-semibold">
            <Link to={"/sign-in"}> Sign In</Link>
          </Button>
          <Button className="hover:underline hover:font-semibold">
            <Link to={"/sign-up"}> Sign Up</Link>
          </Button>
        </div>
      </ButtonGroup>
    </div>
  );
}
