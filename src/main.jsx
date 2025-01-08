import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "modern-normalize";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Loader from './components/Loader/Loader.jsx'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader/>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
