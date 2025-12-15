import Footer from "./partials/Footer";
import Navbar from "./partials/Navbar";

export default function GuestLayout({ children, authedUser, onLogout }) {
  return (
    <>
      <Navbar authedUser={authedUser} onLogout={onLogout} />
      {children}
      <Footer />
    </>
  );
}
