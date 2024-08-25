import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import MoreVert from "@mui/icons-material/MoreVert";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import Search from "./Search";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import LogOutBtn from "./LogOutBtn";

export default function Header() {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <div className="bg-slate-100 h-20 flex items-center justify-between px-5 md:px-20 shadow-md">
      <h1>logo</h1>
      <Search />
      <ButtonGroup
        className=" gap-x-14 hidden md:flex"
        variant="text"
        aria-label="Basic button group"
      >
        <Button variant="contained">
          <Link to={"/"}>Dashboard</Link>
        </Button>

        {currentUser ? (
          <div className="flex gap-x-5 items-center">
            <Link to={"/main"}>
              <PersonOutlineIcon className="text-[#1976d2]" fontSize="large" />
            </Link>
            <LogOutBtn />
          </div>
        ) : (
          <div>
            <Button className="hover:underline hover:font-semibold">
              <Link to={"/sign-in"}> Sign In</Link>
            </Button>
            <Button className="hover:underline hover:font-semibold">
              <Link to={"/sign-up"}> Sign Up</Link>
            </Button>
          </div>
        )}
      </ButtonGroup>
      <div className=" flex md:hidden ">
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu placement="bottom-end">
            <MenuItem>
              <AssignmentIcon />
              <Link to={"/sign-in"}>Sign In</Link>
            </MenuItem>
            <MenuItem>
              <AssignmentIcon />
              <Link to={"/sign-up"}>Sign Up</Link>
            </MenuItem>

            <ListDivider />
            <MenuItem className="bg-blue-100" variant="soft">
              <DashboardIcon />
              <Link to={"/"}>Dashboard</Link>
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
}
