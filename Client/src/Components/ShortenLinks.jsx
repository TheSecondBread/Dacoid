// import React, { useRef, useState } from "react";
// import Cookies from "js-cookie";

// const ShortenLinks = () => {
//   const url = useRef("");
//   const alias = useRef("");
//   const expiry_date = useRef("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const token = Cookies.get("jwt")

//   const HandleSubmit = async () => {
//     setResult(null);
//     setError("");

//     if (url.current.value.trim() === "") {
//       setError("Please paste a URL");
//       return;
//     }

//     const body = {
//       originalUrl: url.current.value,
//       customAlias: alias.current.value || undefined,
//       expiryDate: expiry_date.current.value || undefined,
//     };

//     try {
//       const response = await fetch("http://localhost:8000/api/url/shorten", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });
      

//       const data = await response.json();
//       console.log(data)

//       if (!response.ok) {
//         setError(data.error || "Something went wrong");
//         return;
//       }

//       setResult(`http://localhost:8000/api/url/r/${data.shortUrl}`);
//       console.log(result)
//     } catch (err) {
//       setError("Server error");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center font-sans text-center px-4">
//       <div className="w-full max-w-3xl p-6">
//         <div className="p-6 rounded-2xl shadow-2xl bg-black w-full">
//           <h1 className="font-bold text-2xl sm:text-3xl text-green-400">
//             Paste URL to be shortened
//           </h1>

//           <div className="flex items-center mt-4 justify-center">
//             <input
//               className="border px-3 w-full rounded-sm h-12 bg-white"
//               placeholder="Paste URL"
//               ref={url}
//             />
//           </div>

//           <div className="flex flex-col sm:flex-row items-center justify-center mt-4 gap-4">
//             <div className="w-full sm:w-1/2">
//               <p className="text-left text-white font-bold">Custom url</p>
//               <input
//                 className="border px-3 w-full rounded-sm h-12 bg-white"
//                 placeholder="Optional"
//                 ref={alias}
//               />
//             </div>
//             <div className="w-full sm:w-1/2">
//               <p className="text-left text-white font-bold">Expiry Date (Optional)</p>
//               <input
//                 className="border px-3 w-full rounded-sm h-12 bg-white"
//                 type="date"
//                 ref={expiry_date}
//               />
//             </div>
//           </div>

//           <div className="mt-6 flex justify-center">
//             <button
//               className="bg-blue-600 hover:bg-blue-700 px-6 py-3 w-full sm:w-1/2 text-white font-bold rounded-md"
//               onClick={HandleSubmit}
//             >
//               Shorten URL
//             </button>
//           </div>

//           {/* Display Shortened URL */}
//           {result && (
//             <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md text-left">
//               <p><strong>Shortened Link:</strong> <a href={result} target="_blank" rel="noreferrer" className="underline">{result}</a></p>
//             </div>
//           )}

//           {/* Display Error */}
//           {error && (
//             <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
//               {error}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShortenLinks;


import React, { useRef, useState } from "react";
import Cookies from "js-cookie";

const ShortenLinks = () => {
  const url = useRef("");
  const alias = useRef("");
  const expiry_date = useRef("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("jwt");

  const HandleSubmit = async () => {
    setResult(null);
    setError("");
    setLoading(true);

    if (url.current.value.trim() === "") {
      setError("Please paste a URL");
      setLoading(false);
      return;
    }

    const body = {
      originalUrl: url.current.value,
      customAlias: alias.current.value || undefined,
      expiryDate: expiry_date.current.value || undefined,
    };

    try {
      const response = await fetch("http://localhost:8000/api/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setResult(`http://localhost:8000/api/url/r/${data.shortUrl}`);
    } catch (err) {
      setError("Server error");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center font-sans text-center px-4">
      <div className="w-full max-w-3xl p-6">
        <div className="p-6 rounded-2xl shadow-2xl bg-black w-full">
          <h1 className="font-bold text-2xl sm:text-3xl text-green-400">
            Paste URL to be shortened
          </h1>

          <div className="flex items-center mt-4 justify-center">
            <input
              className="border px-3 w-full rounded-sm h-12 bg-white"
              placeholder="Paste URL"
              ref={url}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center mt-4 gap-4">
            <div className="w-full sm:w-1/2">
              <p className="text-left text-white font-bold">Custom url</p>
              <input
                className="border px-3 w-full rounded-sm h-12 bg-white"
                placeholder="Optional"
                ref={alias}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <p className="text-left text-white font-bold">Expiry Date (Optional)</p>
              <input
                className="border px-3 w-full rounded-sm h-12 bg-white"
                type="date"
                ref={expiry_date}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 w-full sm:w-1/2 text-white font-bold rounded-md flex items-center justify-center gap-2"
              onClick={HandleSubmit}
              disabled={loading}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md text-left">
              <p>
                <strong>Shortened Link:</strong>{" "}
                <a href={result} target="_blank" rel="noreferrer" className="underline">
                  {result}
                </a>
              </p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortenLinks;
