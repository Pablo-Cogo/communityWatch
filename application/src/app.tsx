import { useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./global.style";
import ToastWrapper, {
  ToastWrapperRef,
} from "./components/molecules/toastWrapper";
import ToastService from "./services/toast.service";
import ServiceLocator from "./services/service.locator";
import AppRouter from "./routes";
import { AuthProvider } from "./contexts/auth.context";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const toastWrapperRef = useRef<ToastWrapperRef | null>(null);
  const toastService = new ToastService(toastWrapperRef);

  ServiceLocator.setToastService(toastService);

  return (
    <BrowserRouter>
      <GlobalStyle theme={{ existsRoutes: false }} />
      <ToastWrapper ref={toastWrapperRef} />
      <GoogleOAuthProvider clientId="390627263776-mnm20v2j43q857avt009g3qe6keeurh3.apps.googleusercontent.com">
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
