import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import PrivateRoute from "./private";
import { Suspense } from "react";
import Dashboard from "../pages/dashboard";
import AuthCallback from "../pages/login/callback";
import SignUp from "../pages/signup";
import MailSignUp from "../pages/signup/mail";
import AddressSignUp from "../pages/signup/address";
import { Container } from "../global.style";
import SidebarMenu from "../components/organisms/menu";
import InternalHeader from "../components/organisms/header/internal";
import Occurrences from "../pages/occurrences";
import Main from "../components/organisms/main";
import Resources from "../pages/resources";
import OccurrencesForm from "../pages/occurrences/form";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/new" element={<MailSignUp />} />
        <Route path="/signup/address" element={<AddressSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/adm"
          element={
            <PrivateRoute>
              <Container>
                <SidebarMenu />
                <InternalHeader />
                <Main>
                  <Outlet />
                </Main>
              </Container>
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="chat" element={<>aaa</>} />
          <Route path="occurrences" element={<Occurrences />} />
          <Route path="occurrences/add" element={<OccurrencesForm />} />
          <Route path="resources" element={<Resources />} />
        </Route>
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
