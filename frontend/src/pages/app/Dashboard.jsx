import AppLayout from "../../components/layouts/AppLayout";
import {
  CheckCircleIcon,
  ClockIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  countAssignedEngineerTicketCompleted,
  countAssignedEngineerTicketInProgress,
  countAssignedEngineerTicketNeedMaintenance,
  countMaintenanceTicketCompleted,
  countMaintenanceTicketNeedMaintenance,
  getAllMaintenanceTickets,
  getAssignedEngineersTickets,
} from "@/utils/api-maintenance-tickets";
import { countUserEngineer } from "@/utils/api-user";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Statistic Maintenance Ticket",
    },
  },
};

export default function Dashboard({ authedUser, onLogout }) {
  const [maintenanceTickets, setMaintenanceTickets] = useState([]);
  const [maintenanceTicketsRoleEngineer, setMaintenanceTicketsRoleEngineer] =
    useState([]);
  const [countEngineerData, setcountEngineerData] = useState(null);
  const [
    countMaintenanceTicketNeedMaintenanceData,
    setCountMaintenanceTicketNeedMaintenanceData,
  ] = useState(null);
  const [
    countMaintenanceTicketNeedMaintenanceCompletedData,
    setCountMaintenanceTicketNeedMaintenanceCompletedData,
  ] = useState(null);
  const [
    countMaintenanceTicketCompletedDataEngineer,
    setCountMaintenanceTicketCompletedDataEngineer,
  ] = useState(null);
  const [
    countMaintenanceTicketInProgressDataEngineer,
    setCountMaintenanceTicketInProgressDataEngineer,
  ] = useState(null);
  const [
    countMaintenanceTicketNeedMaintenanceDataEngineer,
    setCountMaintenanceTicketNeedMaintenanceDataEngineer,
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

  const fetchAssignEngineerTickets = async () => {
    try {
      const result = await getAssignedEngineersTickets(authedUser.id);

      if (!result.error) {
        setMaintenanceTicketsRoleEngineer(result.data);
      } else {
        setMaintenanceTicketsRoleEngineer([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountMaintenanceTicketNeedMaintenance = async () => {
    try {
      const result = await countAssignedEngineerTicketNeedMaintenance(
        authedUser.id
      );
      if (!result.error) {
        setCountMaintenanceTicketNeedMaintenanceDataEngineer(result.data);
      } else {
        setCountMaintenanceTicketNeedMaintenanceDataEngineer([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountMaintenanceTicketInProgress = async () => {
    try {
      const result = await countAssignedEngineerTicketInProgress(authedUser.id);
      if (!result.error) {
        setCountMaintenanceTicketInProgressDataEngineer(result.data);
      } else {
        setCountMaintenanceTicketInProgressDataEngineer([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountMaintenanceTicketCompleted = async () => {
    try {
      const result = await countAssignedEngineerTicketCompleted(authedUser.id);
      if (!result.error) {
        setCountMaintenanceTicketCompletedDataEngineer(result.data);
      } else {
        setCountMaintenanceTicketCompletedDataEngineer([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountUserEngineerAdminData = async () => {
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

  const fetchCountMaintenanceTicketNeedMaintenanceAdminData = async () => {
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

  const fetchCountMaintenanceTicketCompletedAdminData = async () => {
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
    fetchAssignEngineerTickets();
    fetchCountUserEngineerAdminData();
    fetchCountMaintenanceTicketNeedMaintenanceAdminData();
    fetchCountMaintenanceTicketCompletedAdminData();
    fetchCountMaintenanceTicketCompleted();
    fetchCountMaintenanceTicketInProgress();
    fetchCountMaintenanceTicketNeedMaintenance();
  }, []);

  let needMaintenance = null;
  let inProgress = null;
  let completed = null;

  if (authedUser.role == "admin") {
    needMaintenance = maintenanceTickets.filter(
      (ticket) => ticket.status == "need_maintenance"
    ).length;
    inProgress = maintenanceTickets.filter(
      (ticket) => ticket.status == "in_progress"
    ).length;
    completed = maintenanceTickets.filter(
      (ticket) => ticket.status == "completed"
    ).length;
  } else {
    console.log("ini eng  ", maintenanceTicketsRoleEngineer);
    needMaintenance = maintenanceTicketsRoleEngineer.filter(
      (ticket) => ticket.status == "need_maintenance"
    ).length;
    inProgress = maintenanceTicketsRoleEngineer.filter(
      (ticket) => ticket.status == "in_progress"
    ).length;
    completed = maintenanceTicketsRoleEngineer.filter(
      (ticket) => ticket.status == "completed"
    ).length;
  }

  const labels = ["Need Maintenance", "In Progress", "Completed"];

  const data = {
    labels,
    datasets: [
      {
        label: "Sum of Maintenance Ticket",
        data: [needMaintenance, inProgress, completed],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <AppLayout authedUser={authedUser} onLogout={onLogout}>
      <div className="flex flex-col xl:pr-80">
        <p className="font-medium text-[32px] text-[#000000] dark:text-white">
          Dashboard
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-[30px]">
          {authedUser.role == "admin" ? (
            <>
              <div className="flex flex-row items-center bg-white dark:bg-[#081028] dark:border-gray-500 border-[1px] rounded-[15px] px-4 pb-6 pt-5 sm:pt-6 w-full h-fit gap-[20px] shadow-sm">
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
              <div className="flex flex-row items-center bg-white dark:bg-[#081028] dark:border-gray-500 border-[1px] rounded-[15px] px-4 pb-6 pt-5 sm:pt-6 w-full h-fit gap-[20px] shadow-sm">
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
              <div className="flex flex-row items-center bg-white dark:bg-[#081028] dark:border-gray-500 border-[1px] rounded-[15px] px-4 pb-6 pt-5 sm:pt-6 w-full h-fit gap-[20px] shadow-sm">
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
            </>
          ) : (
            <>
              <div className="flex flex-row items-center bg-white dark:bg-[#081028] dark:border-gray-500 border-[1px] rounded-[15px] px-4 pb-6 pt-5 sm:pt-6 w-full h-fit gap-[20px] shadow-sm">
                <div className="bg-[#5D5FEF] rounded-xl p-3 flex justify-center items-center">
                  <WrenchScrewdriverIcon className="text-white w-7 h-7" />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <p className="text-gray-500 truncate text-sm font-medium text-muted-foreground">
                    Need Maintenance
                  </p>
                  <p className="font-medium text-2xl text-foreground">
                    {countMaintenanceTicketNeedMaintenanceDataEngineer}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center bg-white dark:bg-[#081028] dark:border-gray-500 border-[1px] rounded-[15px] px-4 pb-6 pt-5 sm:pt-6 w-full h-fit gap-[20px] shadow-sm">
                <div className="bg-yellow-500 rounded-xl p-3 flex justify-center items-center">
                  <ClockIcon className="text-white w-7 h-7" />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <p className="text-gray-500 truncate text-sm font-medium text-muted-foreground">
                    In Progress
                  </p>
                  <p className="font-medium text-2xl text-foreground">
                    {countMaintenanceTicketInProgressDataEngineer}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center bg-white dark:bg-[#081028] dark:border-gray-500 border-[1px] rounded-[15px] px-4 pb-6 pt-5 sm:pt-6 w-full h-fit gap-[20px] shadow-sm">
                <div className="bg-[#4AD991] rounded-xl p-3 flex justify-center items-center">
                  <CheckCircleIcon className="text-white w-7 h-7" />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <p className="text-gray-500 truncate text-sm font-medium text-muted-foreground">
                    Completed Task
                  </p>
                  <p className="font-medium text-2xl text-foreground">
                    {countMaintenanceTicketCompletedDataEngineer}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="lg:col-span-3 md:col-span-2 col-span-1 bg-white dark:bg-[#081028] dark:border-gray-500 border-[1px] rounded-[15px] p-6 shadow-sm mt-5 flex">
            <div className="h-[300px] w-full flex items-center justify-center">
              <Pie data={data} options={options} />
            </div>
          </div>
        </div>

        <aside className="fixed top-[0rem] inset-y-0 right-0 hidden w-[20rem] overflow-y-auto border-l dark:border-gray-500 px-4 lg:px-8 xl:block z-0">
          <div className="rounded-md p-5 mt-24">
            <p className="text-xl font-medium">Maintenance Tickets</p>

            {authedUser.role == "admin" ? (
              <>
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
              </>
            ) : (
              <>
                {maintenanceTicketsRoleEngineer.length > 0 ? (
                  maintenanceTicketsRoleEngineer
                    .filter((ticket) => ticket.status === "need_maintenance")
                    .map((ticket, index) => (
                      <Link
                        to={`/task-maintenance/${ticket.id}`}
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
              </>
            )}
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
