import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.scss";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/NotFound/NotFound";
import ProviderInfo from "./components/ProviderInfo/ProviderInfo";
import ProviderList from "./components/ProviderList/ProviderList";
import DayCareList from "./components/DayCareList/DayCareList";
import SelectedDaycare from "./components/SingleDaycare/SingleDaycare";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<DayCareList />} />
        <Route path="/provider" element={<ProviderInfo />} />
        <Route path="/providerlist" element={<ProviderList/>} />
        <Route path="/daycarelist" element={<DayCareList/>} />
        <Route path="/daycares/:daycareid/info" element={<SelectedDaycare/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
