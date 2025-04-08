import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  const handleLogout = () =>{
    Cookies.remove("jwt")
    setIsLogged(false)
  }
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center p-4 sm:py-6 sm:px-20 border-b shadow-2xl bg-black text-white font-bold gap-4 sm:gap-0">
      <a href="/" className="text-xl sm:text-2xl">
        URL SHORTENER
      </a>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/dashboard" className="hover:underline">
          Dashboard
        </a>
        {isLogged ? (
          <a className="hover:underline" onClick={()=>handleLogout()}>Logout</a>
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
  );
};

export default Navbar;
