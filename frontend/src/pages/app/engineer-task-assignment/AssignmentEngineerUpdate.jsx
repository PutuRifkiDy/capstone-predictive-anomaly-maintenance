import AppLayout from "@/components/layouts/AppLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAssignedEngineerTicketStatusById, updateAssignedEngineersTickets } from "@/utils/api-maintenance-tickets";
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function AssignmentEngineerUpdate({ authedUser, onLogout }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const fetchTicketMaintenanceStatus = async () => {
    try {
      const result = await getAssignedEngineerTicketStatusById(params.id);
      if (result.error) {
        toast.error(result.message);
      } else {
        setStatus(result.data.status);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchTicketMaintenanceStatus();
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!status) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const result = await updateAssignedEngineersTickets(params.id, {
        status,
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message);
        navigate(`/task-maintenance`);
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
        Update Maintenance Ticket
      </p>
      <form className="flex flex-col gap-5 mt-5" onSubmit={onSubmitHandler}>
        <div className="rounded-xl border-[1px] border-gray-200">
          <div className="flex md:flex-row flex-col-reverse items-center justify-between lg:px-10 md:px-10 px-3 py-5 md:gap-0 gap-5">
            <p className="font-medium text-[16px]">
              Maintenance Ticket Information
            </p>
            <Link
              to={`/task-maintenance`}
              className="flex items-center gap-3 px-4 py-2 text-white bg-[#515DEF] rounded-md group"
            >
              <ArrowLeftIcon className="text-white w-3 h-3 group-hover:-translate-x-1 transition-all duration-300 ease-in-out" />
              Back to Task Maintenance
            </Link>
          </div>
          <div className="w-full h-[1px] bg-gray-200" />
          <div className="flex flex-col gap-2 md:px-10 px-3 mb-5 mt-5">
            <label
              htmlFor="status"
              className="text-[14px] text-[#202224] flex gap-1 items-center dark:text-gray-400"
            >
              Status
              <span className="text-red-500">*</span>
            </label>
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="need_maintenance">
                  Need Maintenance
                </SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
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
