import { Routes, Route } from "react-router-dom";

import useCheckAuth from "../HOOK/useCheckAuth.jsx";
import UserRouter from "./UserRouter";
import User from "../Components/Admin/UserAdmin.jsx";
import MystDest from "../Components/Admin/MystDestAdmin.jsx";
import AddMystDest from "../Components/Admin/AddMystDest.jsx";
import UpdateMystDest from "../Components/Admin/UpdateMystDest.jsx";
import CustTrip from "../Components/Admin/CustTripAdmin.jsx";
import CustTripDetail from "../Components/Admin/CustTripDetailAdmin.jsx";
import Reservation from "../Components/Admin/ReservationAdmin.jsx";
import ReservationDetail from "../Components/Admin/ReservationDetailAdmin.jsx";
import Contact from "../Components/Admin/ContactAdmin.jsx";
import ContactDetail from "../Components/Admin/ContactDetailAdmin.jsx";

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
          path="/dashboard/myst-destination"
          element={
            <ProtectedRoute role="admin">
              <MystDest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/myst-destination/add"
          element={
            <ProtectedRoute role="admin">
              <AddMystDest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/myst-destination/update/:id"
          element={
            <ProtectedRoute role="admin">
              <UpdateMystDest />
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
          path="/dashboard/customized-trip/:id"
          element={
            <ProtectedRoute role="admin">
              <CustTripDetail />
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
          path="/dashboard/reservation/:id"
          element={
            <ProtectedRoute role="admin">
              <ReservationDetail />
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
        <Route
          path="/dashboard/contact/:id"
          element={
            <ProtectedRoute role="admin">
              <ContactDetail />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 NOT FOUND USER</h1>} />
      </Routes>
    </>
  );
}

export default AdminRouter;
