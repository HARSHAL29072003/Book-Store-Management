import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
  ];

  if (isLoggedIn) {
    if (role === "user") {
      links.push({ title: "Cart", link: "/cart" });
      links.push({ title: "Profile", link: "/profile" });
    } else if (role === "admin") {
      links.push({ title: "Admin Profile", link: "/profile" });
    }
  }

  const [MobileNav, setMobileNav] = useState("hidden");

  const handleLinkClick = (link) => {
    if (!isLoggedIn && link === "/all-books") {
      navigate("/LogIn");
    } else {
      navigate(link);
    }
  };

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl text-yellow-100 font-semibold">
            BookUniverse
          </h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <div key={i} className="flex items-center">
                {items.title.includes("Profile") ? (
                  <button
                    onClick={() => handleLinkClick(items.link)}
                    className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                  >
                    {items.title}
                  </button>
                ) : (
                  <button
                    onClick={() => handleLinkClick(items.link)}
                    className="hover:text-blue-500 transition-all duration-300"
                  >
                    {items.title}
                  </button>
                )}
              </div>
            ))}
          </div>
          {!isLoggedIn && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/LogIn"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                LogIn
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignUp
              </Link>
            </div>
          )}
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              setMobileNav((prev) => (prev === "hidden" ? "block" : "hidden"))
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <button
            key={i}
            onClick={() => handleLinkClick(items.link)}
            className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
          >
            {items.title}
          </button>
        ))}
        {!isLoggedIn && (
          <>
            <Link
              to="/LogIn"
              className="px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
