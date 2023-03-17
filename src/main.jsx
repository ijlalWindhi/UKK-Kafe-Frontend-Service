import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 
      ChakraProvider adalah komponen yang menyediakan fungsi-fungsi komponen dari Chakra UI
    */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
