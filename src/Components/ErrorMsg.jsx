/**
 * Maps Firebase error codes (and custom codes) to user-friendly messages.
 *
 * SECURITY NOTE: We deliberately show the SAME message for "wrong password",
 * "user not found", and "invalid credential". This prevents "email enumeration"
 * — an attack where someone can figure out which emails are registered by
 * observing different error messages.
 */
const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    // --- Sign Up errors ---
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/password-does-not-meet-requirements":
      return "Password should be at least 6 characters.";
    case "auth/network-request-failed":
      return "Check your internet connection and try again.";

    // --- Sign In errors ---
    // These three all return the same message on purpose (anti-enumeration)
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";

    // --- Rate limiting ---
    case "too-many-attempts":
      return "Too many failed attempts. Please wait 30 seconds.";

    // --- Client-side validation ---
    case "empty-fields":
      return "Please enter your email and password.";
    case "password-too-short":
      return "Password must be at least 8 characters.";
    case "password-no-uppercase":
      return "Password must contain at least one uppercase letter.";
    case "password-no-number":
      return "Password must contain at least one number.";

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
