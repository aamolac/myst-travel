import { Routes, Route } from "react-router-dom";

import Home from "../Components/Home.jsx";
import AboutUs from "../Components/AboutUs.jsx";
import Contact from "../Components/Contact.jsx";
import MystDest from "../Components/MystDest.jsx";
import MystDestDetail from "../Components/MystDestDetail.jsx";
import Reservation from "../Components/Reservation.jsx";
import CustTrip from "../Components/CustTrip.jsx";
import Auth from "../Components/Auth/Auth.jsx";
import Register from "../Components/Auth/Register.jsx";
import useCheckAuth from "../HOOK/useCheckAuth.jsx";
import TermsOfUse from "../Components/TermsOfUse.jsx";
import PrivacyPolicy from "../Components/PrivacyPolicy.jsx";
import LegalInformation from "../Components/LegalInformation.jsx";
import PageNotFound from "../Components/PageNotFound.jsx";

import ProtectedRoute from "../HOC/ProtectedRoute.jsx";

function UserRouter() {
  const user = useCheckAuth();

  // Attendre que `user` soit défini avant de continuer
  if (user === undefined) {
    return <div>Chargement...</div>; // ou un composant de chargement
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/myst-destination" element={<MystDest />} />
        <Route path="/myst-destination/:id" element={<MystDestDetail />} />
        <Route
          path="/myst-destination/:id/reserve"
          element={
            <ProtectedRoute roles={["user", "admin"]}>
              <Reservation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customized-trip"
          element={
            <ProtectedRoute roles={["user", "admin"]}>
              <CustTrip />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/legal-information" element={<LegalInformation />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default UserRouter;
