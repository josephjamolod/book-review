import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { toggle } from "../redux/user/userSlice";

export default function Search() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location.pathname);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermfromUrl = urlParams.get("searchTerm");
    // console.log(searchTermfromUrl);

    if (searchTermfromUrl) {
      setSearchTerm(searchTermfromUrl);
    }
  }, [location.search]);

  const clearInputs = () => {
    setSearchTerm("");
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", "");
    const searchQuery = urlParams.toString();
    navigate(`${location.pathname}?${searchQuery}`);
    dispatch(toggle(new Date()));
  };

  const handleSearchSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`${location.pathname}?${searchQuery}`);
    dispatch(toggle(new Date()));
  };
  return (
    <div
      className={
        "flex  border  rounded-md border-slate-200 transition-all duration-200"
      }
    >
      <form onSubmit={handleSearchSubmit} className="flex">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Author..."
          className="input w-full py-2 pl-3 rounded-md focus:outline-none bg-white  dark:text-neutral-300"
          type="text"
        />
        <button
          type="button"
          onClick={clearInputs}
          className={`${
            !searchTerm && "hidden"
          } px-4 cursor-pointer bg-white hover:bg-green-50 font-semibold dark:text-neutral-300  `}
        >
          x
        </button>
        <div className="border-l px-2 flex justify-center items-center">
          <button>
            <SearchIcon className=" border-slate-200 dark:text-neutral-300" />
          </button>
        </div>
      </form>
    </div>
  );
}
