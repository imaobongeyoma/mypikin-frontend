import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.scss";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/NotFound/NotFound";
// import ProviderInfo from "./components/ProviderInfo/ProviderInfo";
import ProviderList from "./components/ProviderList/ProviderList";
import DayCareList from "./components/DayCareList/DayCareList";
import SelectedDaycare from "./components/SingleDaycare/SingleDaycare";
import AddDayCare from "./components/AddDayCare/AddDayCare";
import Header from "./components/Header/Header";
import Provider from "./components/Provider Details/ProviderInfo";
import EditDayCare from "./components/EditDayCare/EditDayCare";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<DayCareList />} />
        <Route path="/daycarelist" element={<DayCareList/>} />
        {/* <Route path="/provider" element={<ProviderInfo />} /> */}
        <Route path="/providerlist" element={<ProviderList/>} />
        <Route path="/createdaycare" element={<AddDayCare/>} />
        <Route path="/daycares/:id/edit" element={<EditDayCare/>} />
        <Route path="/daycares/:daycareid/info" element={<SelectedDaycare/>} />
        <Route path="/user/:providerid/" element={<Provider/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
