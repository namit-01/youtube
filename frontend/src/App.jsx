import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { AlertProvider } from "./context/AlertContext";
import Shorts from "./pages/shorts/Shorts";
import GetUser from "./customHooks/GetUser";
import { useSelector } from "react-redux";

export default function App() {
  // Call GetUser hook to fetch user data if token exists
  GetUser();

  // Get user data from Redux
  const user = useSelector((state) => state.user.userData);

  return (
    <AlertProvider>
      <Routes>
        {/* Protected Home */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/signin" replace />}
        >
          <Route
            path="/shorts"
            element={user ? <Shorts /> : <Navigate to="/signin" replace />}
          />
        </Route>

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
