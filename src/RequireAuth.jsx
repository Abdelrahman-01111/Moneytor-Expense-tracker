import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Auth } from "../firebase";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX #5: store the unsubscribe function and call it on cleanup.
    // Without this, the listener keeps running even after the component
    // unmounts, which causes a memory leak and can trigger navigation
    // to /auth unexpectedly if the user signs out from another tab.
    const unsub = onAuthStateChanged(Auth, (user) => {
      setLoading(false);
      if (!user) {
        navigate("/auth");
      }
    });
    return () => unsub();
  }, []);

  return loading ? <h1>Loading</h1> : children;
};

export default RequireAuth;
