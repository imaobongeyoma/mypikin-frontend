import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.scss";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/signup"
          element={<SignUp/>}
        />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
