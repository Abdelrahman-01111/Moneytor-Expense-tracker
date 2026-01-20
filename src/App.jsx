import Home from "./Pages/Home.jsx";
import History from "./Pages/History.jsx";
import Auth from "./Pages/Auth.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Settings from "./Pages/Settings.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { SignInContext, HistoryContext, ThemeContext } from "./Contexts.jsx";
import { useState, useEffect } from "react";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [userRef, setUserRef] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <SignInContext.Provider
          value={{
            isSignedIn,
            setIsSignedIn,
            userID,
            setUserID,
            userRef,
            setUserRef,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Home history={historyData} setHistory={setHistoryData} />
              }
            />
            <Route
              path="/history"
              element={<History history={historyData} />}
            />
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
          </Routes>
        </SignInContext.Provider>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}
