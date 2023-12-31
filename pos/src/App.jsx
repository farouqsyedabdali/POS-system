import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "flowbite-react";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin";
import Navbar from "./components/pageNavbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
