import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Start from "./pages/Start"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Tour from "./pages/Tour"
import Request from "./pages/Request"
import Form from "./pages/Form"
import AdminUsers from "./pages/admin/Admin-users"
import AdminRequests from "./pages/admin/Admin-requests"
import ProtectedRoute from "./components/ProtectedRoute"

import './index.css'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Start />}></Route>
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />} />
          <Route path="/tour" element={<Tour />}></Route>

          <Route path="/admin-users" element={<AdminUsers />}></Route>
          <Route path="/admin-requests" element={<AdminRequests />}></Route>


          <Route path="/request" element={<ProtectedRoute><Request /></ProtectedRoute>}/>
          <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>    
  )
}

export default App
