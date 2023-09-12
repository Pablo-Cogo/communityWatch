import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import PrivateRoute from "./private";
import { Suspense } from "react";
import Dashboard from "../pages/dashboard";
import AuthCallback from "../pages/login/callback";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/adm"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <>rota inexixtente</>
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
