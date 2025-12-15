import AppLayout from "@/components/layouts/AppLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createAssignmentTicket,
  getAssignedUsers,
} from "@/utils/api-maintenance-tickets";
import { getUsers } from "@/utils/api-user";
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function AssignmentMaintenanceCreate({ authedUser, onLogout }) {
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  async function fetchUsers() {
    try {
      const response = await getUsers();

      if (response.error == false) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSelectUsers(ticketId) {
    const assignedResponse = await getAssignedUsers(ticketId);
    const assigned = assignedResponse.data;

    const availableUsers = users
      .filter((user) => user.role != "admin")
      .filter(
        (user) => !assigned.some((assignedUser) => assignedUser.id === user.id)
      );

    setFilteredUsers(availableUsers);

    if (availableUsers.length === 0) {
      toast.error(
        "All users role engineer are already assigned to this ticket."
      );
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      handleSelectUsers(params.ticketId);
    }
  }, [users]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!selectedUser) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const result = await createAssignmentTicket({
        userId: selectedUser,
        maintenanceTicketId: params.ticketId,
      });

      if (result.error) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        navigate(`/assignment-maintenance/tasks/${params.ticketId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout authedUser={authedUser} onLogout={onLogout}>
      <p className="font-medium text-[32px] tracking-[-0.11px] text-[#000000] dark:text-white">
        Assignment Maintenance Ticket
      </p>
      <form className="flex flex-col gap-5 mt-5" onSubmit={onSubmitHandler}>
        <div className="rounded-xl border-[1px] border-gray-200 dark:border-gray-200/30">
          <div className="flex md:flex-row flex-col-reverse items-center justify-between lg:px-10 md:px-10 px-3 py-5 md:gap-0 gap-5">
            <p className="font-medium text-[16px]">Assign Maintenance Ticket</p>
            <Link
              to={`/assignment-maintenance/tasks/${params.ticketId}`}
              className="flex items-center gap-3 px-4 py-2 text-[#515DEF] border-[#515DEF] border-[1px] rounded-md group"
            >
              <ArrowLeftIcon className="text-[#515DEF] w-3 h-3 group-hover:-translate-x-1 transition-all duration-300 ease-in-out" />
              Back to Assign Maintenance Ticket
            </Link>
          </div>
          <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-200/30" />

          <div className="flex flex-col gap-2 px-3 md:px-10 mb-5 mt-5">
            <label className="text-[14px] text-[#202224] dark:text-gray-400">
              Select User <span className="text-red-500">*</span>
            </label>

            <Select
              value={selectedUser}
              onValueChange={(value) => setSelectedUser(value)}
              // disabled={!selectedTicket}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose User" />
              </SelectTrigger>

              <SelectContent>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <SelectItem key={user.id} value={`${user.id}`}>
                      {user.name} ({user.role == "admin" ? "Admin" : "Engineer"}
                      )
                    </SelectItem>
                  ))
                ) : (
                  <div className="text-gray-500 px-3 py-2">
                    No available users
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button className="bg-[#515DEF] md:w-32 w-full px-4 py-2 rounded-[4px] text-white hover:shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center gap-2">
            {loading ? (
              <>
                ...Loading
                <CheckBadgeIcon className="w-6 h-6 text-white" />
              </>
            ) : (
              <>
                Submit
                <CheckBadgeIcon className="w-6 h-6 text-white" />
              </>
            )}
          </button>
        </div>
      </form>
    </AppLayout>
  );
}
