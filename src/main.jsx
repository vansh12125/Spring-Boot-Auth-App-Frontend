import { createRoot } from "react-dom/client";
import "./index.css";
import { App, store } from "@/app";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
