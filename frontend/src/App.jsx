import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { AlertProvider } from "./context/AlertContext";
import Navbar from "./components/navbar";
import Shorts from "./pages/shorts/Shorts";

export default function App() {
  return (
    <AlertProvider>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/Shorts" element={<Shorts />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </AlertProvider>
  );
}
