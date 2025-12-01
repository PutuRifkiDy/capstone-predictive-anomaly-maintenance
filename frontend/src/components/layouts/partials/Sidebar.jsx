import { HomeIcon, PowerIcon, UserGroupIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-y-7" role="list">
        <li>
          <ul role="list" className="-mx-2 space-y-2">
            <li>
              <Link
                to={"/dashboard"}
                className={`
                  ${currentPath === '/dashboard'
                    ? 'bg-[#515DEF]/10 relative text-[#515DEF] pl-5'
                    : 'text-foreground hover:bg-gray-100 transition-all duration-300 ease-in-out'}
                  group flex gap-x-3 rounded-md p-3 text-sm font-medium
                `}
              >
                {currentPath === '/dashboard' && <div className="absolute left-0 inset-y-0 bg-[#515DEF] w-1 rounded-l-[10px]" />}
                <HomeIcon className={`w-6 h-6 ${currentPath === '/dashboard' ? 'text-[#515DEF]' : 'text-foreground'}`} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/users"}
                className={`
                  ${currentPath === '/admin/users'
                    ? 'bg-[#515DEF]/10 relative text-[#515DEF] pl-5'
                    : 'text-foreground hover:bg-gray-100 transition-all duration-300 ease-in-out'}
                  group flex gap-x-3 rounded-md p-3 text-sm font-medium
                `}
              >
                {currentPath === '/admin/users' && <div className="absolute left-0 inset-y-0 bg-[#515DEF] w-1 rounded-l-[10px]" />}
                <UserGroupIcon className={`w-6 h-6 ${currentPath === '/admin/users' ? 'text-[#515DEF]' : 'text-foreground'}`} />
                Manajemen Pengguna
              </Link>
            </li>
            <li>
              <Link
                to={"/chatbot"}
                className={`
                  ${currentPath === '/chatbot'
                    ? 'bg-[#515DEF]/10 relative text-[#515DEF] pl-5'
                    : 'text-foreground hover:bg-gray-100 transition-all duration-300 ease-in-out'}
                  group flex gap-x-3 rounded-md p-3 text-sm font-medium
                `}
              >
                {currentPath === '/chatbot' && <div className="absolute left-0 inset-y-0 bg-[#515DEF] w-1 rounded-l-[10px]" />}
                <ChatBubbleLeftRightIcon className={`w-6 h-6 ${currentPath === '/chatbot' ? 'text-[#515DEF]' : 'text-foreground'}`} />
                Chatbot
              </Link>
            </li>
          </ul>
        </li>
        <li className="-mx-6 mt-auto">
          <div className="flex items-center gap-x-1 px-6 py-3 text-sm font-semibold hover:bg-gray-100 cursor-pointer transition-all duration-300 ease-in-out">
            <PowerIcon className="w-6 h-6 text-red-600" />
            <p className="font-semibold text-sm p-3 text-red-600">Keluar</p>
          </div>
        </li>
      </ul>
    </nav>
  );
}