import {
  Drawer,
  IconButton,
  List,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Avatar, Button, Navbar, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoInfo } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../redux/theme/themeSlice";
const Header = () => {
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTerm) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  console.log(searchTerm);
  return (
    <header className="w-full !bg-[rgba(16,23,42,0.11)] dark:!bg-[rgba(1,1,2,0.16)] shadow-lg">
      <Navbar className="max-w-6xl mx-auto justify-between flex items-center !bg-transparent flex-nowrap">
        <Link to={"/"} className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-gray-500">My</span>
          <span>Estate</span>
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className=" w-40 sm:w-fit"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Navbar.Collapse>
          <Navbar.Link
            className={`${path === "/" && "font-bold"} text-md`}
            as={"div"}
          >
            <Link to={"/"}>Home</Link>
          </Navbar.Link>
          <Navbar.Link
            // active={}
            className={`${path === "/about" && "font-bold"} text-md`}
            as={"div"}
          >
            <Link to={"/about"}>About</Link>
          </Navbar.Link>
        </Navbar.Collapse>
        <div className="gap-2 items-center hidden md:flex">
          <Button
            pill
            color="gray"
            className="w-12 h-10"
            onClick={() => dispatch(toggleTheme())}
          >
            {" "}
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </Button>
          {currentUser ? (
            <Link to={"/profile"}>
              <Avatar img={currentUser.avatar} rounded />
            </Link>
          ) : (
            <Link to={"/signIn"}>
              <Button color={"gray"}>Sign In</Button>
            </Link>
          )}
        </div>
        <Button
          color={"gray"}
          pill
          className="w-14 h-10 inline md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <GiHamburgerMenu className="text-xl" />
        </Button>
      </Navbar>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        color="gray"
        placement="right"
        className="z-20 dark:text-gray-200 dark:bg-[rgb(16,23,42)] inline md:hidden border-l-2 dark:border-gray-800"
      >
        <div className="mb-2 flex items-center justify-between p-4">
          {currentUser ? (
            <Link to={"/profile"}>
              <Avatar
                rounded
                img={currentUser?.avatar}
                onClick={() => setIsOpen(false)}
              />
            </Link>
          ) : (
            <Link to={"/signIn"}>
              <Button color={"gray"}>Sign In</Button>
            </Link>
          )}
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setIsOpen(false)}
          >
            <IoMdClose className="text-xl dark:text-white text-black" />
          </IconButton>
        </div>
        <List className="flex flex-col gap-1">
          <Link
            onClick={() => setIsOpen(false)}
            to={"/"}
            className={`${
              path === "/" && "bg-gray-100 dark:bg-gray-800"
            } flex items-center gap-2 font-semibold hover:bg-gray-100 h-12 rounded-md px-3 text-lg hover:dark:bg-gray-800 `}
          >
            <ListItemPrefix>
              <FaHome />
            </ListItemPrefix>
            Home
          </Link>
          <Link
            to={"/about"}
            onClick={() => setIsOpen(false)}
            className={`${
              path === "/about" && "bg-gray-100 dark:bg-gray-800"
            } flex items-center gap-2 font-semibold hover:bg-gray-100 h-12 rounded-md px-3 text-lg hover:dark:bg-gray-800 `}
          >
            <ListItemPrefix>
              <GoInfo />
            </ListItemPrefix>
            About
          </Link>
          <span
            onClick={() => dispatch(toggleTheme())}
            className={` flex items-center gap-2 hover:bg-gray-100 h-12 rounded-md px-3 text-lg hover:dark:bg-gray-800 cursor-pointer `}
          >
            <ListItemPrefix>
              {theme === "light" ? <FaSun /> : <FaMoon />}
            </ListItemPrefix>
            {theme === "light" ? "Light Mood" : "Dark Mood"}
          </span>
        </List>
      </Drawer>
    </header>
  );
};

export default Header;
