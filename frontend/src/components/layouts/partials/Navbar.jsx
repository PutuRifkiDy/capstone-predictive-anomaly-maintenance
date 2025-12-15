import { useState } from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HomeIcon } from "@heroicons/react/24/solid";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Navbar({ authedUser, onLogout }) {
  console.log(authedUser);
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
          {authedUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="py-6 flex items-center">
                <div className="flex items-center justify-center w-12 h-12 p-4 rounded-full bg-[#515DEF] text-white">
                  {authedUser?.name.substring(0, 2).toUpperCase()}
                </div>{" "}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[13rem] flex flex-col gap-1 dark:bg-[#081028]"
              >
                <div className="flex items-center gap-2 p-2">
                  <div className="flex items-center justify-center w-6 h-6 p-4 rounded-full bg-[#515DEF] text-white">
                    {authedUser?.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-medium text-[14px] tracking-[-0.25px] text-foreground">
                      {authedUser?.name}
                    </p>
                    <p className="font-medium text-[10px] tracking-[-0.25px] text-gray-500">
                      {authedUser?.email}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 w-full h-[1px]" />
                <DropdownMenuItem
                  className="flex gap-5 items-center cursor-pointer font-medium"
                  asChild
                >
                  <Link to={"/dashboard"} className="">
                    <HomeIcon className="!w-6 !h-6 font-medium flex-shrink-0" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onLogout}
                  className="flex gap-5 items-center cursor-pointer text-red-600 font-medium"
                >
                  <ArrowLeftEndOnRectangleIcon className="!w-6 !h-6 font-bold text-red-600 flex-shrink-0" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              className="bg-[#515DEF] w-full py-6 px-10 text-lg hover:bg-[#404bc0]"
              asChild
            >
              <Link to={"/login"} className="dark:text-white">
                Login
              </Link>
            </Button>
          )}
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
        {authedUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="py-6 flex items-center">
              <div className="flex items-center justify-center w-12 h-12 p-4 rounded-full bg-[#515DEF] text-white">
                {authedUser?.name.substring(0, 2).toUpperCase()}
              </div>{" "}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-[13rem] flex flex-col gap-1 dark:bg-[#081028]"
            >
              <div className="flex items-center gap-2 p-2">
                <div className="flex items-center justify-center w-6 h-6 p-4 rounded-full bg-[#515DEF] text-white">
                  {authedUser?.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-medium text-[14px] tracking-[-0.25px] text-foreground">
                    {authedUser?.name}
                  </p>
                  <p className="font-medium text-[10px] tracking-[-0.25px] text-gray-500">
                    {authedUser?.email}
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 w-full h-[1px]" />
              <DropdownMenuItem
                className="flex gap-5 items-center cursor-pointer font-medium"
                asChild
              >
                <Link to={"/dashboard"} className="">
                  <HomeIcon className="!w-6 !h-6 font-medium flex-shrink-0" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onLogout}
                className="flex gap-5 items-center cursor-pointer text-red-600 font-medium"
              >
                <ArrowLeftEndOnRectangleIcon className="!w-6 !h-6 font-bold text-red-600 flex-shrink-0" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="default"
            className="bg-[#515DEF] w-full py-6 text-lg hover:bg-[#404bc0]"
            asChild
          >
            <Link to={"/login"} className="dark:text-white">
              Login
            </Link>
          </Button>
        )}
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
      <a href={"/#"} className={className}>
        Home
      </a>
     <a href={"/#predictive-maintenance"} className={className}>
        Predictive Maintenance
      </a>
     <a href={"/#tasks-assignment"} className={className}>
        Tasks Assignment
      </a>
     <a href={"/#ai-copilot"} className={className}>
        AI Copilot
      </a>
   </>
  );
}
