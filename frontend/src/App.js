import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./Components/pages/LoginPage";
import HomePage from "./Components/pages/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/success" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
