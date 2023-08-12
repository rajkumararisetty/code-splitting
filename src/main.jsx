import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";

import configureStore from "./redux/redux-store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={configureStore()}>
      <App />
  </Provider>
);
