import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { AlertProvider } from "./context/AlertContext";
import Navbar from "./components/navbar";
import Shorts from "./pages/shorts/Shorts";
import GetUser from "./customHooks/GetUser";
import MobileProfile from "./components/MobileProfile";
import ForgetPassword from "./pages/ForgetPassword";
import CreateChannel from "./channel/CreateChannel";
import GetChannel from "./customHooks/GetChannel";
import ViewChannel from "./channel/ViewChannel";
import UpdateChannel from "./channel/updateChannel";
import { useSelector } from "react-redux";

// ✅ SAME ProtectedRoute (no change)
const ProtectedRoute = ({ userData, children }) => {
  if (!userData) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default function App() {
  const userData = useSelector((state) => state.user);

  GetUser();
  GetChannel();

  return (
    <AlertProvider>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path="Shorts"
            element={
              <ProtectedRoute userData={userData}>
                <Shorts />
              </ProtectedRoute>
            }
          />
          <Route
            path="mobilepro"
            element={
              <ProtectedRoute userData={userData}>
                <MobileProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="viewchannel"
            element={
              <ProtectedRoute userData={userData}>
                <ViewChannel />
              </ProtectedRoute>
            }
          />
          <Route
            path="updatechannel"
            element={
              <ProtectedRoute userData={userData}>
                <UpdateChannel />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Public routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        {/* Protected but outside Home */}
        <Route
          path="/createChannel"
          element={
            <ProtectedRoute userData={userData}>
              <CreateChannel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AlertProvider>
  );
}
