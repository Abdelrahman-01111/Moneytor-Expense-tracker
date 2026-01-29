import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Auth } from "../firebase";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(1);
  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      setLoading(0);
      if (!user) {
        navigate("/auth");
      }
    });
  }, []);
  return loading ? <h1>Loading</h1> : children;
};

export default RequireAuth;
