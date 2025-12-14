import Footer from "./partials/Footer";
import Navbar from "./partials/Navbar";

export default function GuestLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
