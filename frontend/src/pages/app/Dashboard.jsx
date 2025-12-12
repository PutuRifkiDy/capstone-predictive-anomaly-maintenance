import AppLayout from "../../components/layouts/AppLayout";
import {
  CheckCircleIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import {
  countMaintenanceTicketCompleted,
  countMaintenanceTicketNeedMaintenance,
  countUserEngineer,
  getAllMaintenanceTickets,
} from "@/utils/api";
import { Link } from "react-router";

export default function Dashboard({ authedUser, onLogout }) {
  const [maintenanceTickets, setMaintenanceTickets] = useState([]);
  const [countEngineerData, setcountEngineerData] = useState(null);
  const [
    countMaintenanceTicketNeedMaintenanceData,
    setCountMaintenanceTicketNeedMaintenanceData,
  ] = useState(null);
  const [
    countMaintenanceTicketNeedMaintenanceCompletedData,
    setCountMaintenanceTicketNeedMaintenanceCompletedData,
  ] = useState(null);
  const fetchMaintenanceTicketsData = async () => {
    try {
      const result = await getAllMaintenanceTickets();
      console.log(result);
      if (result.error == false) {
        setMaintenanceTickets(result.data);
      } else {
        setMaintenanceTickets([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountUserEngineerData = async () => {
    try {
      const result = await countUserEngineer();
      console.log(result);
      if (result.error == false) {
        setcountEngineerData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountMaintenanceTicketNeedMaintenanceData = async () => {
    try {
      const result = await countMaintenanceTicketNeedMaintenance();
      console.log(result);
      if (result.error == false) {
        setCountMaintenanceTicketNeedMaintenanceData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountMaintenanceTicketNeedMaintenanceCompletedData = async () => {
    try {
      const result = await countMaintenanceTicketCompleted();
      console.log(result);
      if (result.error == false) {
        setCountMaintenanceTicketNeedMaintenanceCompletedData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMaintenanceTicketsData();
    fetchCountUserEngineerData();
    fetchCountMaintenanceTicketNeedMaintenanceData();
    fetchCountMaintenanceTicketNeedMaintenanceCompletedData();
  }, []);
  return (
    <AppLayout authedUser={authedUser} onLogout={onLogout}>
      <div className="flex flex-col xl:pr-80">
        <p className="font-medium text-[32px] text-[#000000] dark:text-white">
          Dashboard
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-[30px]">
          <div className="flex flex-row items-center bg-white dark:bg-[#081028] border-gray-200 border-[1px] rounded-[15px] px-4 pb-6 pt-5 sm:pt-6 w-full h-fit gap-[20px] shadow-sm">
            <div className="bg-[#5D5FEF] rounded-xl p-3 flex justify-center items-center">
              <UserGroupIcon className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-gray-500 truncate text-sm font-medium text-muted-foreground">
                Engineer
              </p>
              <p className="font-medium text-2xl text-foreground">
                {countEngineerData}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center bg-white dark:bg-[#081028] border-gray-200 border-[1px] rounded-[15px] px-4 pb-6 pt-5 sm:pt-6 w-full h-fit gap-[20px] shadow-sm">
            <div className="bg-yellow-500 rounded-xl p-3 flex justify-center items-center">
              <DocumentChartBarIcon className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-gray-500 truncate text-sm font-medium text-muted-foreground">
                Tasks Pending
              </p>
              <p className="font-medium text-2xl text-foreground">
                {countMaintenanceTicketNeedMaintenanceData}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center bg-white dark:bg-[#081028] border-gray-200 border-[1px] rounded-[15px] px-4 pb-6 pt-5 sm:pt-6 w-full h-fit gap-[20px] shadow-sm">
            <div className="bg-[#4AD991] rounded-xl p-3 flex justify-center items-center">
              <CheckCircleIcon className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-gray-500 truncate text-sm font-medium text-muted-foreground">
                Completed Task
              </p>
              <p className="font-medium text-2xl text-foreground">
                {countMaintenanceTicketNeedMaintenanceCompletedData}
              </p>
            </div>
          </div>

          {/* grafik */}
        </div>

        <aside className="fixed top-[5.5rem] inset-y-0 right-0 hidden w-[20rem] overflow-y-auto border-l border-gray-200 px-4 lg:px-8 xl:block">
          <div className="rounded-md p-5 mt-5">
            <p className="text-xl font-medium">Maintenance Tickets</p>
            <p className="text-[12px] text-gray-500 italic">
              *assign those tickets that need maintenance to engineers
            </p>
            {maintenanceTickets.length > 0 ? (
              maintenanceTickets
                .filter((ticket) => ticket.status === "need_maintenance")
                .map((ticket, index) => (
                  <Link
                    to={`/assignment-maintenance/tasks/${ticket.id}`}
                    className="mb-5 mt-5 flex items-center gap-x-3 leading-relaxed"
                    key={index}
                  >
                    <div className="rounded-full bg-indigo-500 p-3">
                      <DocumentChartBarIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="line-clamp-1 text-base font-medium leading-relaxed">
                        {ticket.title}
                      </span>
                      <span className="text-xs font-light text-muted-foreground">
                        {ticket.description}
                      </span>
                    </div>
                  </Link>
                ))
            ) : (
              <p className="text-sm font-medium">No tickets found</p>
            )}
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
