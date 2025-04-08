import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const HandleSignup = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email === "" || password === "") {
      alert("Please fill all the details");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://dacoid-nhb5.onrender.com/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        Cookies.set("jwt", data.token);
        navigate("/");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      setLoading(false);
      alert("Something went wrong. Please try again.");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 bg-gray-100">
      <div className="bg-black p-6 sm:p-10 md:p-16 lg:px-20 flex flex-col gap-4 rounded-lg w-full max-w-sm shadow-xl">
        <h1 className="text-white font-bold text-3xl sm:text-4xl text-center">Signup</h1>

        <label className="text-white font-semibold text-base sm:text-lg">Email</label>
        <input
          ref={emailRef}
          className="bg-amber-50 px-3 h-10 font-semibold rounded-sm"
          placeholder="intern@dacoid.com"
          type="email"
        />

        <label className="text-white font-semibold text-base sm:text-lg mt-2">Password</label>
        <input
          ref={passwordRef}
          className="bg-amber-50 px-3 h-10 font-semibold rounded-sm"
          placeholder="Test123"
          type="password"
        />

        <button
          className="bg-green-400 hover:bg-green-500 transition-all px-6 py-3 mt-6 text-white font-bold rounded-md flex items-center justify-center"
          onClick={HandleSignup}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            "Signup"
          )}
        </button>
      </div>
    </div>
  );
};

export default Signup;
