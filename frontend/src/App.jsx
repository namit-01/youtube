import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { AlertProvider } from "./context/AlertContext";
import Shorts from "./pages/shorts/Shorts";
import GetUser from "./customHooks/GetUser";
import { useSelector } from "react-redux";

export default function App() {
  GetUser();

  const user = useSelector((state) => state.user.userData);

  return (
    <AlertProvider>
      <Routes>
        {/* IF LOGGED IN → SHOW HOME, OTHERWISE → SIGNIN */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/signin" replace />}
        />

        {/* Shorts Protected */}
        <Route
          path="/shorts"
          element={user ? <Shorts /> : <Navigate to="/signin" replace />}
        />

        {/* Public Routes */}
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" replace />}
        />

        <Route
          path="/signin"
          element={!user ? <SignIn /> : <Navigate to="/" replace />}
        />
      </Routes>
    </AlertProvider>
  );
}
