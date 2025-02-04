import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Start from "./pages/Start"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Tour from "./pages/Tour"
import Request from "./pages/Request"
import Form from "./pages/Form"
import Credentials from "./pages/Credentials"
import Policies from "./pages/Policies"

import AdminUsers from "./pages/admin/Admin-users"
import AdminKpis from "./pages/admin/Admin-kpis"
import AdminRequests from "./pages/admin/Admin-requests"
import AdminAuthentication from "./pages/admin/Admin-authentication"
import AdminVisits from "./pages/admin/Admin-visits"

import ProtectedRoute from "./components/ProtectedRoute"

import './index.css'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function LogoutAdmin() {
  localStorage.clear()
  return <Navigate to="/authentication-admin" />
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
          <Route path="/logout-admin" element={<LogoutAdmin />} />
          <Route path="/authentication-admin" element={<AdminAuthentication />}></Route>
          <Route path="/tour" element={<Tour />}></Route>
          <Route path="/privacy-policies" element={<Policies />}></Route>


          {/* Rutas protegidas para usuarios */}
          <Route path="/request" element={<ProtectedRoute><Request /></ProtectedRoute>}/>
          <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>}/>
          <Route path="/credentials" element={<ProtectedRoute><Credentials /></ProtectedRoute>}/>

          {/* Rutas protegidas para administrador */}
          <Route path="/admin-kpis" element={<ProtectedRoute adminRoute> <AdminKpis /> </ProtectedRoute>}></Route>
          <Route path="/admin-users-list" element={<ProtectedRoute adminRoute> <AdminUsers /> </ProtectedRoute>}></Route>
          <Route path="/admin-requests-list" element={<ProtectedRoute adminRoute> <AdminRequests /> </ProtectedRoute>}></Route>
          <Route path="/admin-visits" element={<ProtectedRoute adminRoute> <AdminVisits /> </ProtectedRoute>}></Route>

        </Routes>
      </BrowserRouter>    
  )
}

export default App
