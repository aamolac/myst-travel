import useCheckAuth from "./HOOK/useCheckAuth.jsx";

import Header from "./Components/Partial/Header.jsx";
import AdminRouter from "./Router/AdminRouter.jsx";
import UserRouter from "./Router/UserRouter";
import Footer from "./Components/Partial/Footer.jsx";

function App() {
  const user = useCheckAuth();

  return (
    <>
      <Header />
      {user?.role === "admin" ? <AdminRouter /> : <UserRouter />}
      <Footer />
    </>
  );
}

export default App;
