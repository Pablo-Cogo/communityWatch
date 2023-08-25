import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation";
import { GlobalStyle } from "./global.style";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle theme={{ existsRoutes: false }} />
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
