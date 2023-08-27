import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Navigation;
