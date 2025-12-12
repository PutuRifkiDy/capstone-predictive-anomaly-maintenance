import AppLayout from "@/components/layouts/AppLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useInput from "@/hooks/useInput";
import { createMaintenanceTicket } from "@/utils/api";
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function MaintenanceTicketCreate({ authedUser, onLogout }) {
  const [title, onTitleChange, setTitle] = useInput("");
  const [description, onDescriptionChange, setDescription] = useInput("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!title || !description || !status) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const result = await createMaintenanceTicket({
        title,
        description,
        status,
        userId: authedUser.id,
      });
      if (result.error) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        setTitle("");
        setDescription("");
        setStatus("");
        navigate(`/maintenance-ticket`);
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
        Create Maintenance Ticket
      </p>
      <form className="flex flex-col gap-5 mt-5" onSubmit={onSubmitHandler}>
        <div className="rounded-xl border-[1px] border-gray-200 dark:border-gray-200/30">
          <div className="flex md:flex-row flex-col-reverse items-center justify-between lg:px-10 md:px-10 px-3 py-5 md:gap-0 gap-5">
            <p className="font-medium text-[16px]">Maintenance Ticket Information</p>
            <Link
              to={`/maintenance-ticket`}
              className="flex items-center gap-3 px-4 py-2 text-white bg-[#515DEF] rounded-md group"
            >
              <ArrowLeftIcon className="text-white w-3 h-3 group-hover:-translate-x-1 transition-all duration-300 ease-in-out" />
              Back to Maintenance Ticket
            </Link>
          </div>
          <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-200/30" />
          <div className="flex flex-col gap-2 md:px-10 px-3 mb-3  mt-5">
            <label
              htmlFor="title"
              className="text-[14px] text-[#202224] flex gap-1 items-center dark:text-gray-400"
            >
              Title
              <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              placeholder="Input your title here..."
              className="border-[1px] px-4 py-2 border-[#E6EAED] dark:border-gray-200/30 rounded-[4px] focus:outline-none placeholder:text-gray-400 dark:bg-[#081028]"
              value={title}
              onChange={onTitleChange}
            />
          </div>
          <div className="flex flex-col gap-2 md:px-10 px-3 mb-3 ">
            <label
              htmlFor="description"
              className="text-[14px] text-[#202224] flex gap-1 items-center dark:text-gray-400"
            >
              Description
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Input your description here..."
              className="border-[1px] px-4 py-2 border-[#E6EAED] dark:border-gray-200/30 rounded-[4px] focus:outline-none placeholder:text-gray-400 dark:bg-[#081028] resize-none"
              value={description}
              onChange={onDescriptionChange}
            />
          </div>
          <div className="flex flex-col gap-2 md:px-10 px-3 mb-5">
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
