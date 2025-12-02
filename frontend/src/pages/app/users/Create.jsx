import AppLayout from "@/components/layouts/AppLayout";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/solid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Create() {
  return (
    <AppLayout>
      <p className="font-medium text-[32px] tracking-[-0.11px] text-[#000000] dark:text-white">
        Create User
      </p>
      <form className="flex flex-col gap-5 mt-5">
        <div className="rounded-xl border-[1px] border-gray-200">
          <div className="flex md:flex-row flex-col-reverse items-center justify-between lg:px-10 md:px-10 px-3 py-5 md:gap-0 gap-5">
            <p className="font-medium text-[16px]">User Information</p>
            <button className="flex items-center gap-3 lg:w-24 md:w-24 w-full px-4 py-2 text-white bg-[#515DEF] rounded-md group">
              <ArrowLeftIcon className="text-white w-3 h-3 group-hover:-translate-x-1 transition-all duration-300 ease-in-out" />
              Back to User
            </button>
          </div>
          <div className="w-full h-[1px] bg-gray-200" />
          <div className="flex flex-col gap-2 md:px-10 px-3 mb-3  mt-5">
            <label
              htmlFor="name"
              className="text-[14px] text-[#202224] flex gap-1 items-center dark:text-gray-400"
            >
              Name
              <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="Input your name here..."
              className="border-[1px] px-4 py-2 border-[#E6EAED] rounded-[4px] focus:outline-none placeholder:text-gray-400 dark:bg-[#081028]"
            />
          </div>
          <div className="flex flex-col gap-2 md:px-10 px-3 mb-3 ">
            <label
              htmlFor="email"
              className="text-[14px] text-[#202224] flex gap-1 items-center dark:text-gray-400"
            >
              Email
              <span className="text-red-500">*</span>
            </label>
            <input
              name="Email"
              placeholder="Input your email here..."
              className="border-[1px] px-4 py-2 border-[#E6EAED] rounded-[4px] focus:outline-none placeholder:text-gray-400 dark:bg-[#081028]"
            />
          </div>
          <div className="flex flex-col gap-2 md:px-10 px-3 mb-3 ">
            <label
              htmlFor="phone_number"
              className="text-[14px] text-[#202224] flex gap-1 items-center dark:text-gray-400"
            >
              Phone Number
              <span className="text-red-500">*</span>
            </label>
            <input
              name="phone_number"
              placeholder="Input your phone number here..."
              className="border-[1px] px-4 py-2 border-[#E6EAED] rounded-[4px] focus:outline-none placeholder:text-gray-400 dark:bg-[#081028]"
            />
          </div>
          <div className="flex flex-col gap-2 md:px-10 px-3 mb-5">
            <label
              htmlFor="role"
              className="text-[14px] text-[#202224] flex gap-1 items-center dark:text-gray-400"
            >
              Role
              <span className="text-red-500">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Admin</SelectItem>
                <SelectItem value="dark">Engineer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button className="w-fit bg-[#515DEF] px-4 py-2 rounded-[4px] text-white hover:shadow-2xl transition-all duration-300 ease-in-out flex items-center gap-2">
            Submit
            <CheckIcon className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>
    </AppLayout>
  );
}
