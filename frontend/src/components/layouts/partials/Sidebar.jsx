import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HomeIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  TicketIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router";

export default function Sidebar({ isSidebarOpen, authedUser, onLogout }) {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-y-7" role="list">
        {isSidebarOpen == true ? (
          <>
            <li>
              <ul role="list" className="-mx-2 space-y-2">
                <li>
                  <Link
                    to={"/dashboard"}
                    className={`
                  ${
                    currentPath.startsWith("/dashboard")
                      ? "bg-[#515DEF]/10 relative text-[#515DEF] pl-5"
                      : "text-foreground hover:bg-gray-100 dark:hover:bg-[#7E89AC]/30 transition-all duration-300 ease-in-out"
                  }
                  group flex gap-x-3 rounded-md p-3 text-sm font-medium items-center
                `}
                  >
                    {currentPath.startsWith("/dashboard") && (
                      <div className="absolute left-0 inset-y-0 bg-[#515DEF] w-1 rounded-l-[10px]" />
                    )}
                    <HomeIcon
                      className={`w-6 h-6 ${
                        currentPath.startsWith("/dashboard")
                          ? "text-[#515DEF]"
                          : "text-foreground"
                      }`}
                    />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/users"}
                    className={`
                  ${
                    currentPath.startsWith("/admin/users")
                      ? "bg-[#515DEF]/10 relative text-[#515DEF] pl-5"
                      : "text-foreground hover:bg-gray-100 dark:hover:bg-[#7E89AC]/30 transition-all duration-300 ease-in-out"
                  }
                  group flex gap-x-3 rounded-md p-3 text-sm font-medium items-center
                `}
                  >
                    {currentPath.startsWith("/admin/users") && (
                      <div className="absolute left-0 inset-y-0 bg-[#515DEF] w-1 rounded-l-[10px]" />
                    )}
                    <UserGroupIcon
                      className={`w-6 h-6 ${
                        currentPath.startsWith("/admin/users")
                          ? "text-[#515DEF]"
                          : "text-foreground"
                      }`}
                    />
                    User Management
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/maintenance-ticket`}
                    className={`
                  ${
                    currentPath.startsWith("/maintenance") ||
                    currentPath.startsWith("/assignment")
                      ? "bg-[#515DEF]/10 relative text-[#515DEF] pl-5"
                      : "text-foreground hover:bg-gray-100 dark:hover:bg-[#7E89AC]/30 transition-all duration-300 ease-in-out"
                  }
                  group flex gap-x-3 rounded-md p-3 text-sm font-medium items-center
                `}
                  >
                    {currentPath.startsWith("/maintenance") ||
                      (currentPath.startsWith("/assignment") && (
                        <div className="absolute left-0 inset-y-0 bg-[#515DEF] w-1 rounded-l-[10px]" />
                      ))}
                    <TicketIcon
                      className={`w-6 h-6 ${
                        currentPath.startsWith("/maintenance") ||
                        currentPath.startsWith("/assignment")
                          ? "text-[#515DEF]"
                          : "text-foreground"
                      }`}
                    />
                    Maintenance Tickets
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/chatbot/${authedUser.id}`}
                    className={`
                  ${
                    currentPath.startsWith("/chatbot")
                      ? "bg-[#515DEF]/10 relative text-[#515DEF] pl-5"
                      : "text-foreground hover:bg-gray-100 dark:hover:bg-[#7E89AC]/30 transition-all duration-300 ease-in-out"
                  }
                  group flex gap-x-3 rounded-md p-3 text-sm font-medium items-center
                `}
                  >
                    {currentPath.startsWith("/chatbot") && (
                      <div className="absolute left-0 inset-y-0 bg-[#515DEF] w-1 rounded-l-[10px]" />
                    )}
                    <ChatBubbleLeftRightIcon
                      className={`w-6 h-6 ${
                        currentPath.startsWith("/chatbot")
                          ? "text-[#515DEF]"
                          : "text-foreground"
                      }`}
                    />
                    Chatbot
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mt-auto flex items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="py-6 flex gap-5 items-center">
                  <div className="flex items-center justify-center w-12 h-12 p-4 rounded-full bg-[#515DEF] text-white">
                    {authedUser.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col gap-1 justify-center">
                    <p className="font-medium text-[14px] tracking-[-0.25px] text-foreground">
                      {authedUser.name}
                    </p>
                    <div className="flex justify-center font-medium items-center bg-[#515DEF] rounded-full py-1 px-3 text-white w-fit text-[10px]">
                      {authedUser.role}
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[13rem] flex flex-col gap-1 dark:bg-[#081028]">
                  <div className="flex items-center gap-2 p-2">
                    <div className="flex items-center justify-center w-6 h-6 p-4 rounded-full bg-[#515DEF] text-white">
                      {authedUser.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-medium text-[14px] tracking-[-0.25px] text-foreground">
                        {authedUser.name}
                      </p>
                      <p className="font-medium text-[10px] tracking-[-0.25px] text-gray-500">
                        {authedUser.email}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-100 w-full h-[1px]" />
                  <DropdownMenuItem className="flex gap-5 items-center cursor-pointer font-medium">
                    <HomeIcon className="!w-6 !h-6 font-medium flex-shrink-0" />
                    Beranda
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
            </li>
          </>
        ) : (
          <>
            <li>
              <ul role="list" className="space-y-2">
                <li>
                  <Link
                    to={"/dashboard"}
                    className={`
                  ${
                    currentPath === "/dashboard"
                      ? "bg-[#515DEF]/10 relative text-[#515DEF]"
                      : "text-foreground hover:bg-gray-100 dark:hover:bg-[#7E89AC]/30 transition-all duration-300 ease-in-out"
                  }
                  group flex gap-x-3 ${
                    isSidebarOpen == true ? "rounded-md" : ""
                  } p-3 text-sm font-medium items-center justify-center
                `}
                  >
                    {currentPath === "/dashboard" && (
                      <div className="absolute left-0 inset-y-0 bg-[#515DEF] w-1 rounded-l-[10px]" />
                    )}
                    <HomeIcon
                      className={`w-6 h-6 ${
                        currentPath === "/dashboard"
                          ? "text-[#515DEF]"
                          : "text-foreground"
                      }`}
                    />
                    {/* Dashboard */}
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/users"}
                    className={`
                  ${
                    currentPath.startsWith("/admin/users")
                      ? "bg-[#515DEF]/10 relative text-[#515DEF]"
                      : "text-foreground hover:bg-gray-100 dark:hover:bg-[#7E89AC]/30 transition-all duration-300 ease-in-out"
                  }
                  group flex gap-x-3 ${
                    isSidebarOpen == true ? "rounded-md" : ""
                  } p-3 text-sm font-medium items-center justify-center
                `}
                  >
                    {currentPath.startsWith("/admin/users") && (
                      <div className="absolute left-0 inset-y-0 bg-[#515DEF] w-1 rounded-l-[10px]" />
                    )}
                    <UserGroupIcon
                      className={`w-6 h-6 ${
                        currentPath.startsWith("/admin/users")
                          ? "text-[#515DEF]"
                          : "text-foreground"
                      }`}
                    />
                    {/* User Management */}
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/maintenance-ticket`}
                    className={`
                  ${
                    currentPath.startsWith("/maintenance") ||
                    currentPath.startsWith("/assignment")
                      ? "bg-[#515DEF]/10 relative text-[#515DEF] pl-5"
                      : "text-foreground hover:bg-gray-100 dark:hover:bg-[#7E89AC]/30 transition-all duration-300 ease-in-out"
                  }
                  group flex justify-center gap-x-3 rounded-md p-3 text-sm font-medium items-center
                `}
                  >
                    {currentPath.startsWith("/maintenance") ||
                      (currentPath.startsWith("/assignment") && (
                        <div className="absolute left-0 inset-y-0 bg-[#515DEF] w-1 rounded-l-[10px]" />
                      ))}
                    <TicketIcon
                      className={`w-6 h-6 ${
                        currentPath.startsWith("/maintenance") ||
                        currentPath.startsWith("/assignment")
                          ? "text-[#515DEF]"
                          : "text-foreground"
                      }`}
                    />
                    {/* Maintenance Tickets{} */}
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/chatbot/${authedUser.id}`}
                    className={`
                  ${
                    currentPath === "/chatbot"
                      ? "bg-[#515DEF]/10 relative text-[#515DEF]"
                      : "text-foreground hover:bg-gray-100 dark:hover:bg-[#7E89AC]/30 transition-all duration-300 ease-in-out"
                  }
                  group flex gap-x-3 ${
                    isSidebarOpen == true ? "rounded-md" : ""
                  } p-3 text-sm font-medium items-center justify-center
                `}
                  >
                    {currentPath === "/chatbot" && (
                      <div className="absolute left-0 inset-y-0 bg-[#515DEF] w-1 rounded-l-[10px]" />
                    )}
                    <ChatBubbleLeftRightIcon
                      className={`w-6 h-6 ${
                        currentPath === "/chatbot"
                          ? "text-[#515DEF]"
                          : "text-foreground"
                      }`}
                    />
                    {/* Chatbot */}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mt-auto flex items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="py-6 flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 p-4 rounded-full bg-[#515DEF] text-white">
                    {authedUser.name.substring(0, 2).toUpperCase()}
                  </div>{" "}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[13rem] flex flex-col gap-1 dark:bg-[#081028]">
                  <div className="flex items-center gap-2 p-2">
                    <div className="flex items-center justify-center w-6 h-6 p-4 rounded-full bg-[#515DEF] text-white">
                      {authedUser.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-medium text-[14px] tracking-[-0.25px] text-foreground">
                        {authedUser.name}
                      </p>
                      <p className="font-medium text-[10px] tracking-[-0.25px] text-gray-500">
                        {authedUser.email}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-100 w-full h-[1px]" />
                  <DropdownMenuItem className="flex gap-5 items-center cursor-pointer font-medium">
                    <HomeIcon className="!w-6 !h-6 font-medium flex-shrink-0" />
                    Beranda
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
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
