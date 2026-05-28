import Home from "./Pages/Home.jsx";
import History from "./Pages/History.jsx";
import LogIn from "./Pages/LogIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Settings from "./Pages/Settings.jsx";
import DebtList from "./Pages/DebtList.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { SignInContext, ThemeContext } from "./Contexts.jsx";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard.jsx";
import RequireAuth from "./RequireAuth.jsx";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [userRef, setUserRef] = useState("");

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
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            >
              <Route index element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />}></Route>
              <Route path="/debts" element={<DebtList />} />
            </Route>

            <Route path="/auth" element={<LogIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Routes>
        </SignInContext.Provider>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}
