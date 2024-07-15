import "bootstrap/dist/css/bootstrap.min.css";
import "./style/App.scss";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";

function App() {
  return (
    <>
      <MyNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
