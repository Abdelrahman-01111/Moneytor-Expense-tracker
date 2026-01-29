import React, { useEffect } from "react";
const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/password-does-not-meet-requirements":
      return "Password should be at least 6 characters.";
    case "auth/network-request-failed":
      return "Check your internet connection and try again.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};
function ErrorMsg({ code = "", onClose }) {
  return (
    <div
      role="alert"
      className="p-3 text-red-500 flex items-center justify-between mb-3"
    >
      <span>{getFriendlyErrorMessage(code)}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss error"
        className="ml-4 font-bold"
      >
        x
      </button>
    </div>
  );
}

export default ErrorMsg;
