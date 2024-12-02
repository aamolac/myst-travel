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
import TermsOfUse from "../Components/Legal/TermsOfUse.jsx";
import PrivacyPolicy from "../Components/Legal/PrivacyPolicy.jsx";
import LegalInformation from "../Components/Legal/LegalInformation.jsx";
import PageNotFound from "../Components/PageNotFound.jsx";

import ProtectedRoute from "../HOC/ProtectedRoute.jsx";

import TitleUpdater from "./TitleUpdater.jsx";

function UserRouter() {
  const user = useCheckAuth();

  // Attendre que `user` soit défini avant de continuer
  if (user === undefined) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <TitleUpdater />
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
