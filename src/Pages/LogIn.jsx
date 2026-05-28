import { useRef } from "react";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState, useContext } from "react";
import { app } from "../../firebase";
import { useNavigate } from "react-router";
import { SignInContext } from "../Contexts";
import Auth from "../Components/Auth";
import PasswordInput from "../Components/PasswordInput";

const auth = getAuth(app);

/** Max failed attempts before temporarily locking the form */
const MAX_ATTEMPTS = 5;
/** How long (ms) to lock the form after too many failures */
const LOCKOUT_MS = 30_000;

export default function LogIn() {
  const navigate = useNavigate();
  const { setIsSignedIn } = useContext(SignInContext);
  const [err, setErr] = useState("");

  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const lockTimerRef = useRef(null);

  const isLocked = Date.now() < lockedUntil;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLocked) {
      setErr("too-many-attempts");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!email || !password) {
      setErr("empty-fields");
      return;
    }

    setSubmitting(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      setIsSignedIn(true);
      setAttempts(0);
      navigate("/");
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setErr(error.code);

      if (newAttempts >= MAX_ATTEMPTS) {
        const unlockTime = Date.now() + LOCKOUT_MS;
        setLockedUntil(unlockTime);
        setErr("too-many-attempts");
        lockTimerRef.current = setTimeout(() => {
          setAttempts(0);
          setLockedUntil(0);
          setErr("");
        }, LOCKOUT_MS);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Auth
      title="Welcome Back!"
      err={err}
      setErr={setErr}
      linkTo="/signup"
      linkLabel="Create account"
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="email"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.currentTarget.form?.elements.namedItem("password")?.focus();
            }
          }}
          placeholder="Email"
          name="email"
          autoComplete="on"
          className="auth-input"
        />

        <PasswordInput />

        <button
          type="submit"
          disabled={submitting || isLocked}
          className="bg-white text-black p-3 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Signing in…" : isLocked ? "Try again later" : "Login"}
        </button>
      </form>
    </Auth>
  );
}
