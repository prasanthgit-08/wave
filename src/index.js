import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n from "./i18next/i18n";
import AppWrapper from "./AppWrapper";
import ErrorBoundaryWrapper from "./components/common/errorBoundary";

// Updated for React 18+
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      {/* <App /> */}
      {/* Adding New AppWrapper for preventing leading whitespace */}
      <ErrorBoundaryWrapper>
        <AppWrapper />
      </ErrorBoundaryWrapper>
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
