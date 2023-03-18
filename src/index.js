import React from "react";
import ReactDOM from "react-dom/client";
import App from "./component/App";
import { UserProvider } from "./component/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
