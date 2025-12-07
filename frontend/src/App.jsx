import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { AlertProvider } from "./context/AlertContext";
import Shorts from "./pages/shorts/Shorts";
import GetUser from "./customHooks/GetUser";
import { useState, useEffect } from "react";

export default function App() {
  const [tokenExists, setTokenExists] = useState(false);
  const navigate = useNavigate();

  useEffect(async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      setTokenExists(true);
      await GetUser(); // fetch user data
      navigate("/"); // redirect to home immediately
    }
  }, []);

  return (
    <AlertProvider>
      <Routes>
        {/* Protected Home */}
        <Route
          path="/"
          element={tokenExists ? <Home /> : <Navigate to="/signin" replace />}
        >
          <Route
            path="/shorts"
            element={
              tokenExists ? <Shorts /> : <Navigate to="/signin" replace />
            }
          />
        </Route>

        {/* Public Routes */}
        <Route
          path="/signup"
          element={!tokenExists ? <SignUp /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signin"
          element={!tokenExists ? <SignIn /> : <Navigate to="/" replace />}
        />
      </Routes>
    </AlertProvider>
  );
}
