import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { AlertProvider } from "./context/AlertContext";
import Shorts from "./pages/shorts/Shorts";
import GetUser from "./customHooks/GetUser";

export default function App() {
  // Call GetUser hook to fetch user data if token exists
  GetUser();

  // Check if token exists in cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return (
    <AlertProvider>
      <Routes>
        {/* Protected Home */}
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/signin" replace />}
        >
          <Route
            path="/shorts"
            element={token ? <Shorts /> : <Navigate to="/signin" replace />}
          />
        </Route>

        {/* Public Routes */}
        <Route
          path="/signup"
          element={!token ? <SignUp /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signin"
          element={!token ? <SignIn /> : <Navigate to="/" replace />}
        />
      </Routes>
    </AlertProvider>
  );
}
