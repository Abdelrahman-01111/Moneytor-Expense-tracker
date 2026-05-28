import { useState } from "react";

/**
 * Reusable password field with show/hide toggle.
 * Uses the same styling as the email input but adds an eye icon button.
 */
export default function PasswordInput({
  name = "password",
  placeholder = "Password",
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        autoComplete="on"
        className="auth-input pr-12"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
      >
        <span className="material-symbols-outlined text-xl">
          {show ? "visibility_off" : "visibility"}
        </span>
      </button>
    </div>
  );
}
