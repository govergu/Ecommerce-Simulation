import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header>
      <nav className="border-b-1 border-gray-400 flex justify-between items-center h-20 p-2">
        <div>
          <Link to="/">
            <img
              src="https://i.pinimg.com/736x/3f/29/71/3f29711482c0309afac26f782a04df0a.jpg"
              alt=""
              className="w-12"
            />
          </Link>
        </div>
        <div className="relative lg:block hidden">
          <input
            type="text"
            className="w-xl h-10 border-1 rounded-3xl pl-5 pr-45"
          />
          <button
            className="absolute right-1 top-1 text-white bg-amber-500 px-10 py-1 rounded-3xl flex items-center justify-between gap-5 font-semibold"
            onClick={() => navigate("/searchitem")}
          >
            <IoSearchSharp />
            Search
          </button>
        </div>
        <div className="flex gap-10 items-center">
          <span className="h-12 w-12">
            <Link to="/cart">
              <IoCartOutline className="h-full w-full" />
            </Link>
          </span>

          <Link to="/register">Login</Link>
          <button className="text-white bg-amber-500 px-2 py-1 rounded-3xl font-semibold w-full sm:px-5 sm:py-2">
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
