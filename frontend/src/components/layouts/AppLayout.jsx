import CompanyLogo from "../icons/CompanyLogo";
import Sidebar from "./partials/Sidebar";

export default function AppLayout({ children }) {
  return (
    <>
      <div>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <header className="flex items-center gap-3 shrink-0 h-24">
              <CompanyLogo />
              <p className="font-bold text-[22px] leading-[150%] tracking-[-1%]">Predicta<span className="text-[#515DEF]">Energy</span></p>
            </header>
            <Sidebar />
          </div>
        </div>
        <main className="py-10 lg:pl-72 bg-gray-50">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}