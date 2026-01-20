import { SignInContext, ThemeContext } from "../Contexts";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { Auth } from "/firebase";
import { useNavigate } from "react-router";
export default function Settings() {
  const navigate = useNavigate();
  const { setIsSignedIn } = useContext(SignInContext);
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="p-4">
      <h1 className="text-2xl text-bold mb-6 ">Settings</h1>
      <button
        className="bg-blue-500 text-white rounded-md p-2 mr-4"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Toggle to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
      <button
        className="bg-red-500 text-white rounded-md p-2 "
        onClick={() => {
          signOut(Auth).then(() => {
            setIsSignedIn(false);
            localStorage.removeItem("balance");
            navigate("/auth");
          });
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
