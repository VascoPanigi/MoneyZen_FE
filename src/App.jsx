import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.scss";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import MyNavbar from "./components/MyNavbar";
import Homepage from "./components/Homepage";
import { Component } from "./components/Component";

function App() {
  return (
    <>
      {/* <MyNavbar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/chart" element={<Component />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
