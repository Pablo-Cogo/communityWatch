import { useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./global.style";
import ToastWrapper, {
  ToastWrapperRef,
} from "./components/molecules/toastWrapper";
import ToastService from "./services/toast.service";
import ServiceLocator from "./services/service.locator";
import AppRouter from "./routes";
import AppProvider from "./contexts/app.context";
import AutoFocusService from "./services/autofocus.service";

function App() {
  const toastWrapperRef = useRef<ToastWrapperRef | null>(null);
  const toastService = new ToastService(toastWrapperRef);
  const autoFocusService = new AutoFocusService(true);

  ServiceLocator.setToastService(toastService);
  ServiceLocator.setAutoFocusService(autoFocusService);

  return (
    <BrowserRouter>
      <GlobalStyle theme={{ existsRoutes: false }} />
      <ToastWrapper ref={toastWrapperRef} />
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
