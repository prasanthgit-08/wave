import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import toast from "react-hot-toast";

// Custom fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  console.error(error?.message);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="error-boundary-fallback text-center" role="alert">
        <h2>Something went wrong</h2>
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            toast.dismiss(); // clear any existing toast
            resetErrorBoundary();
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default function ErrorBoundaryWrapper({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("Error caught by boundary:", error, info);
      }}
      onReset={() => {
        // optional: reset global state, clear cache, etc.
        window.location.reload(); // force reload if you want a clean state
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
