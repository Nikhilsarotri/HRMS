import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Login from './pages/Login';
import Layout from './Layout';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Leaves from './pages/Leaves';
import { Register } from "./pages/Register";
import Candidates from "./pages/Candidates";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

        {/* Dashboard Layout with nested routes */}
        <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/candidates" />} /> 
        <Route path="candidates" element={<Candidates/>} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leaves" element={<Leaves />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
