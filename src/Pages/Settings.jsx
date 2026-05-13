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
    <div className="p-4 min-h-full bg-white dark:bg-midnight-950 ">
      <h1 className="text-3xl font-semibold mb-6 text-center mt-6">Settings</h1>
      <button
        className="bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded-md w-full p-3 mr-4 flex items-center justify-center"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div className="flex items-center gap-2">
          {theme === "dark" ? (
            <>
              <span className="material-symbols-outlined">light_mode</span>
              <p className="text-md">light</p>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">dark_mode</span>
              <p className="text-md">dark</p>
            </>
          )}
        </div>
      </button>
      <button
        className="bg-red-500 w-full mt-4 text-white rounded-md p-2 "
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
