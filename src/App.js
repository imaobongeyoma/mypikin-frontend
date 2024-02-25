import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./styles/global.scss";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProviderInfoPage from "./pages/ProviderInfoPage";
import EditUser from "./components/EditProvider/EditProvider";
import AddDayCare from "./components/AddDayCare/AddDayCare";
import EditDayCare from "./components/EditDayCare/EditDayCare";
import SingleDaycarePage from "./pages/SingleDaycarePage";
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import DayCareList from "./components/DayCareList/DayCareList";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = ()=> {
    setMenuOpen(prevState => !prevState);
  };

  
  return (
    <BrowserRouter>
      <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/:providerid/" element={<ProviderInfoPage />} />
        <Route path="user/:id/edit" element={<EditUser/>} />
        <Route path="/user/:id/createdaycare" element={<AddDayCare />} />
        <Route path="/daycares/:id/edit" element={<EditDayCare />} />
        <Route path="/daycarelist" element={<DayCareList menuOpen={menuOpen} />} />
        <Route path="/" element={<DayCareList menuOpen={menuOpen} />} />
        <Route path="/daycares/:daycareid/info" element={<SingleDaycarePage />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
