import { useState } from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white dark:bg-[#081028] shadow-sm transition-colors duration-300">
      <div className="px-12 py-4 flex justify-between items-center max-w-full mx-auto">
        <Link to="/" className="shrink-0">
          <img
            src="/prevo-logo-with-text.png"
            className="h-12 md:h-16 w-auto object-contain"
            alt="Prevo Logo"
          />
        </Link>

        <div className="hidden lg:flex gap-8 xl:gap-10 items-center">
          <NavLinks />
        </div>

        <div className="hidden lg:flex gap-4 items-center">
          <ThemeSwitcher />
          <Button
            variant="default"
            className="bg-[#515DEF] px-8 py-2 hover:bg-[#404bc0]"
            asChild
          >
            <Link to={"/login"} className="dark:text-white font-medium">
              Login
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <ThemeSwitcher /> 
          <button
            onClick={toggleMenu}
            className="text-gray-600 dark:text-white focus:outline-none p-2"
          >
            {isOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white dark:bg-[#081028] border-t dark:border-slate-800 shadow-lg flex flex-col px-6 py-6 gap-6 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <NavLinks mobile />

        <Button
          variant="default"
          className="bg-[#515DEF] w-full py-6 text-lg hover:bg-[#404bc0]"
          asChild
        >
          <Link to={"/login"} className="dark:text-white">
            Login
          </Link>
        </Button>
      </div>
    </nav>
  );
}

function NavLinks({ mobile = false }) {
  const baseClass =
    "font-medium transition-all duration-300 ease-in-out hover:text-[#515DEF] hover:underline dark:hover:text-[#7d86f5]";
  const mobileClass =
    "text-lg text-gray-800 dark:text-slate-200 block border-b border-gray-100 dark:border-slate-800 pb-2";
  const desktopClass = "text-gray-600 dark:text-slate-300";

  const className = `${baseClass} ${mobile ? mobileClass : desktopClass}`;

  return (
    <>
      <Link to={""} className={className}>
        Home
      </Link>
      <Link to={""} className={className}>
        Predictive Maintenance
      </Link>
      <Link to={""} className={className}>
        Tasks Assignment
      </Link>
      <Link to={""} className={className}>
        AI Copilot
      </Link>
    </>
  );
}
