import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Homepage from "./components/Homepage";
import TransactionPage from "./components/TransactionPage";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfile";
// import { Component } from "./components/Component";
// import WalletsSlider from "./components/WalletsSlider";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/me" element={<UserProfile />} />
          <Route path="/*" element={<NotFound />} />
          {/* <Route path="/chart" element={<Component />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
