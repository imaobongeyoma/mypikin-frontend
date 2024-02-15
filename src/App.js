import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.scss";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/NotFound/NotFound";
import ProviderInfo from "./components/ProviderInfo/ProviderInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<NotFound />} />
        <Route path="/provider" element={<ProviderInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
