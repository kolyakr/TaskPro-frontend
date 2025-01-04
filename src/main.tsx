// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SkeletonTheme } from "react-loading-skeleton";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <SkeletonTheme highlightColor="#FFFFFF80" baseColor="black">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SkeletonTheme>
    </PersistGate>
  </Provider>
);
