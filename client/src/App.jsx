import { Routes, Route } from "react-router-dom";
import Header from "./Components/Partial/Header.jsx";
import Home from "./Components/Home.jsx";
import AboutUs from "./Components/AboutUs.jsx";
import Contact from "./Components/Contact.jsx";
import MystDest from "./Components/MystDest.jsx";
import MystDestDetail from "./Components/MystDestDetail.jsx";
import Reservation from "./Components/Reservation.jsx";
import CustTrip from "./Components/CustTrip.jsx";
import Auth from "./Components/Auth/Auth.jsx";
import Register from "./Components/Auth/Register.jsx";
import Footer from "./Components/Partial/Footer.jsx";
import useCheckAuth from "./HOOK/useCheckAuth.jsx";
import TermsOfUse from "./Components/TermsOfUse.jsx";
import PrivacyPolicy from "./Components/PrivacyPolicy.jsx";

import Dashboard from "./Components/Admin/Dashboard.jsx";

function App() {
  // useCheckAuth();

  const user = useCheckAuth();

  // Attendre que `user` soit défini avant de continuer
  if (user === undefined) {
    return <div>Chargement...</div>; // ou un composant de chargement
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/myst-destination" element={<MystDest />} />
        <Route path="/myst-destination/:id" element={<MystDestDetail />} />
        <Route path="/myst-destination/:id/reserve" element={<Reservation />} />
        <Route path="/customized-trip" element={<CustTrip />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {user?.role === "admin" && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}

        <Route path="*" element={<h1>404 NOT FOUND USER</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
