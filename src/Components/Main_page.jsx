import React from "react";
import Faq from "./Faq/Faq";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export default function Main_page() {
  sessionStorage.setItem("isAuthenticated",false);
  return (
    <div className="App">
      <div className="overlay"></div>
      

      <Header />
      <Faq />
      <Footer />
    </div>
  );
}
