import { ViewColumnsIcon, WindowIcon } from "@heroicons/react/24/outline";
import CompanyLogo from "../icons/CompanyLogo";
import Sidebar from "./partials/Sidebar";
import { Fragment, useState } from "react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import SidebarResponsive from "./partials/SidebarResponsive";
import SidebarOpenContext from "@/context/SidebarOpenContext";

export default function AppLayout({ children, authedUser, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(true);

  const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div>
      <SidebarOpenContext.Provider value={isSidebarOpen}>
        {/* sidebar mobile */}
        <Transition.Root show={isSidebarOpenMobile} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setIsSidebarOpenMobile}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setIsSidebarOpenMobile(false)}
                      >
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar mobile */}
                  <SidebarResponsive
                    isSidebarOpenMobile={isSidebarOpenMobile}
                    authedUser={authedUser}
                    onLogout={onLogout}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* sidebar dekstop */}
        <div
          className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ease-in-out 
          ${isSidebarOpen == true ? "lg:w-72" : "lg:w-24"}`}
        >
          <div
            className={`flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-500
            ${isSidebarOpen == true ? "px-6" : "px-0"}`}
          >
            {isSidebarOpen == true ? (
              <header className="flex items-center gap-3 shrink-0 h-24">
                <img src="/prevo-logo-with-text.png" alt="" />
                <p className="font-bold text-[22px] leading-[150%] tracking-[-1%]">
                  Predicta
                  <span className="text-[#515DEF]">Energy</span>
                </p>
              </header>
            ) : (
              <header className="flex items-center justify-center gap-3 shrink-0 h-24">
                <img src="/prevo-logo-without-text.png" alt="" />
              </header>
            )}
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              authedUser={authedUser}
              onLogout={onLogout}
            />
          </div>
        </div>

        {/* header mobile */}
        <div className="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden bg-white dark:bg-[#081028]">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setIsSidebarOpenMobile(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <ViewColumnsIcon className="h-6 w-6 text-foreground" />
          </button>
          <div className="h-5 w-0.5 bg-gray-300" />
          <ThemeSwitcher />
        </div>

        <main
          className={`${
            isSidebarOpen == true ? "lg:pl-72" : "lg:pl-24"
          } transition-all duration-300 ease-in-out relative`}
        >
          {/* header dekstop */}
          <div className="py-5 lg:flex hidden items-center justify-between border-b border-gray-200 dark:border-gray-500 bg-white dark:bg-[#081028] z-50 relative">
            <div className="flex items-center gap-3">
              <button
                className="border-0 hover:bg-gray-200 dark:hover:bg-[#7E89AC]/20 p-2 sm:ml-2 lg:ml-4 w-fit rounded-lg transition-all duration-300 ease-in-out group"
                onClick={handleSidebar}
              >
                <ViewColumnsIcon className="w-6 h-6 text-gray-600" />
              </button>
              <div className="h-5 w-0.5 bg-gray-300" />
              <p className="text-[16px] tracking-[-0.25px] text-gray-500">
                <span className="font-medium">
                  Predicta<span className="text-[#515DEF]">Energy</span>
                </span>{" "}
                web application for checking the performance of your machines
              </p>
            </div>
            <div className="pr-5">
              <ThemeSwitcher />
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 py-5">{children}</div>
          <div className="absolute bottom-0 right-5"></div>
        </main>
      </SidebarOpenContext.Provider>
    </div>
  );
}
