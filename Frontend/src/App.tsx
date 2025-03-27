//Imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Pages
import Users from "./pages/users/Users";
import Profile from "./pages/users/Profile/Profile";

function App() {
  return (
      <BrowserRouter>
          <ToastContainer />
          <Routes>
              <Route path="*" element={<Navigate to="/usuarios" />} />
              <Route path="usuarios" element={<Users />} />
              <Route path="perfil/:id" element={<Profile />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
