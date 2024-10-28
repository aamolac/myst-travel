import { Routes, Route } from "react-router-dom";

import useCheckAuth from "../HOOK/useCheckAuth.jsx";
import UserRouter from "./UserRouter";
import User from "../Components/Admin/UserAdmin.jsx";
import CustTrip from "../Components/Admin/CustTripAdmin.jsx";
import Reservation from "../Components/Admin/ReservationAdmin.jsx";
import Contact from "../Components/Admin/ContactAdmin.jsx";

import Dashboard from "../Components/Admin/Dashboard.jsx";
import ProtectedRoute from "../HOC/ProtectedRoute.jsx";

function AdminRouter() {
  const user = useCheckAuth();

  // Attendre que `user` soit défini avant de continuer
  if (user === undefined) {
    return <div>Chargement...</div>; // ou un composant de chargement
  }

  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute role="admin">
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/customized-trip"
          element={
            <ProtectedRoute role="admin">
              <CustTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/reservation"
          element={
            <ProtectedRoute role="admin">
              <Reservation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/contact"
          element={
            <ProtectedRoute role="admin">
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 NOT FOUND USER</h1>} />
      </Routes>
    </>
  );
}

export default AdminRouter;
