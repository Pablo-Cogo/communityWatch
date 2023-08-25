import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Navigation;
