import { useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./global.style";
import ToastWrapper, {
  ToastWrapperRef,
} from "./components/molecules/toastWrapper";
import ToastService from "./services/toast.service";
import ServiceLocator from "./services/service.locator";
import AppRouter from "./routes";

function App() {
  const toastWrapperRef = useRef<ToastWrapperRef | null>(null);
  const toastService = new ToastService(toastWrapperRef);

  ServiceLocator.setToastService(toastService);

  return (
    <BrowserRouter>
      <GlobalStyle theme={{ existsRoutes: false }} />
      <ToastWrapper ref={toastWrapperRef} />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
