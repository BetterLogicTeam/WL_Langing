import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "../src/Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Faq from "./Components/Faq/Faq";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Report from "./Components/view_Report/Report";
import Main_page from "./Components/Main_page";
import Protected from "./Components/Protected";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div >
  
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main_page />} />
          <Route path="/Report" element={<Protected Components={Report} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
