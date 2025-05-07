// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from 'react';
// import Login from './pages/Login';
// import Layout from './Layout';
// import Employees from './pages/Employees';
// import Attendance from './pages/Attendance';
// import Leaves from './pages/Leaves';
// import { Register } from "./pages/Register";
// import Candidates from "./pages/Candidates";
// import { Navigate } from "react-router-dom";

// function App() {
//   return (
//     <BrowserRouter basename="/">
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register/>} />

//         {/* Dashboard Layout with nested routes */}
//         <Route path="/" element={<Layout />}>
//         <Route index element={<Navigate to="/candidates" />} /> 
//         <Route path="candidates" element={<Candidates/>} />
//           <Route path="employees" element={<Employees />} />
//           <Route path="attendance" element={<Attendance />} />
//           <Route path="leaves" element={<Leaves />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;








import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Layout from './Layout';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Leaves from './pages/Leaves';
import { Register } from "./pages/Register";
import Candidates from "./pages/Candidates";

// Create ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check if user is logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />; // Redirect to login page if not logged in
  }
  return children; // Allow access to the protected route if logged in
};

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Layout with nested routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/login" />} /> {/* Redirect to login if not logged in */}

          <Route
            path="candidates"
            element={
              <ProtectedRoute>
                <Candidates />
              </ProtectedRoute>
            }
          />
          <Route
            path="employees"
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="leaves"
            element={
              <ProtectedRoute>
                <Leaves />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
