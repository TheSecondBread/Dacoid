import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const location = useLocation();

  // useEffect(() => {
  //   const token = Cookies.get("jwt");
  //   setIsLogged(!!token);
  // }, [location]);

  const handleLogout = () => {
    Cookies.remove("jwt");
    setIsLogged(false);
  };

  return (
    <div className="p-4 sm:py-6 sm:px-20 border-b shadow-2xl bg-black text-white font-bold">
      <div className="flex justify-between items-center">
        <a href="/" className="text-xl sm:text-2xl">
          URL SHORTENER
        </a>
        <button
          className="sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="hidden sm:flex gap-10 items-center">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/dashboard" className="hover:underline">
            Dashboard
          </a>
          {isLogged ? (
            <a onClick={handleLogout} className="hover:underline cursor-pointer">
              Logout
            </a>
          ) : (
            <>
              <a href="/signin" className="hover:underline">
                Signin
              </a>
              <a href="/signup" className="hover:underline">
                Signup
              </a>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="flex flex-col sm:hidden mt-4 gap-4">
          <a href="/" className="hover:underline" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="/dashboard" className="hover:underline" onClick={() => setMenuOpen(false)}>
            Dashboard
          </a>
          {isLogged ? (
            <a
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="hover:underline cursor-pointer"
            >
              Logout
            </a>
          ) : (
            <>
              <a href="/signin" className="hover:underline" onClick={() => setMenuOpen(false)}>
                Signin
              </a>
              <a href="/signup" className="hover:underline" onClick={() => setMenuOpen(false)}>
                Signup
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
