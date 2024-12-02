import { Routes, Route } from "react-router-dom";

import Dashboard from "../Components/Admin/Dashboard.jsx";
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
import PageNotFound from "../Components/PageNotFound.jsx";

import UserRouter from "./UserRouter";
import useCheckAuth from "../HOOK/useCheckAuth.jsx";
import ProtectedRoute from "../HOC/ProtectedRoute.jsx";
import TitleUpdater from "./TitleUpdater.jsx";

function AdminRouter() {
  const user = useCheckAuth();

  // Attendre que `user` soit défini avant de continuer
  if (user === undefined) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <TitleUpdater />
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute roles={["admin"]}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/myst-destination"
          element={
            <ProtectedRoute roles={["admin"]}>
              <MystDest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/myst-destination/add"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AddMystDest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/myst-destination/update/:id"
          element={
            <ProtectedRoute roles={["admin"]}>
              <UpdateMystDest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/customized-trip"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CustTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/customized-trip/:id"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CustTripDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/reservation"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Reservation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/reservation/:id"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ReservationDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/contact"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/contact/:id"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ContactDetail />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default AdminRouter;
