import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { Auth as firebaseAuth } from "../../firebase";
import ErrorMsg from "./ErrorMsg";

/**
 * Shared layout for Login and SignUp pages.
 * Handles: loading state, redirect if already logged in,
 * illustration panel, dark form area, error display, and bottom link.
 */
export default function Auth({
  title,
  children,
  err,
  setErr,
  linkTo,
  linkLabel,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      setLoading(false);
      if (user) navigate("/");
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100svh]">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row-reverse w-full h-[100svh] overflow-hidden">
      {/* Illustration */}
      <div className="text-center p-10 flex flex-col justify-center align-center md:w-1/2 w-full h-1/2 md:h-full effect relative">
        <h1 className="text-4xl mb-10 justify-self-start text-black dark:text-white">
          Moneytor
        </h1>
        <p className="text-2xl text-black dark:text-gray-200">
          Your Digital Expense Tracker.
        </p>
      </div>

      {/* Form area */}
      <div className="bg-midnight-950 text-white flex flex-col justify-center align-center rounded-t-3xl md:rounded-none h-1/2 md:h-screen w-full md:w-1/2 p-8">
        <h1 className="text-2xl mb-5 text-center">{title}</h1>

        {children}

        {err && <ErrorMsg code={err} onClose={() => setErr("")} />}

        <div className="mt-4 text-center text-sm text-gray-400">
          <NavLink to={linkTo} className="underline">
            {linkLabel}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
