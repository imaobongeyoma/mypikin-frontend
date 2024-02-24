import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.scss";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/LoginPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProviderInfoPage from "./pages/LoginPage/ProviderInfoPage";
import EditUser from "./components/EditProvider/EditProvider";
import AddDayCare from "./components/AddDayCare/AddDayCare";
import EditDayCare from "./components/EditDayCare/EditDayCare";
import DaycareListPage from "./pages/LoginPage/DaycareListPage";
import SingleDaycarePage from "./pages/LoginPage/SingleDaycarePage";
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/:providerid/" element={<ProviderInfoPage />} />
        <Route path="user/:id/edit" element={<EditUser/>} />
        <Route path="/user/:id/createdaycare" element={<AddDayCare />} />
        <Route path="/daycares/:id/edit" element={<EditDayCare />} />
        <Route path="/" element={<DaycareListPage />} />
        <Route path="/daycarelist" element={<DaycareListPage />} />
        <Route path="/daycares/:daycareid/info" element={<SingleDaycarePage />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
