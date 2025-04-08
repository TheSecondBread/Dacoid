import Navbar from "./Components/Navbar";
import ShortenLinks from "./Components/ShortenLinks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import AnalyticsDashboard from "./Components/AnalyticsDashboard";
function App() {
  return (
    <div className="h-[100vh] bg-[#fafafa]">
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShortenLinks />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="dashboard" element={<AnalyticsDashboard/>}></Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
