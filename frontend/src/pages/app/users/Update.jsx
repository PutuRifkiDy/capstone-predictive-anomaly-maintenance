import AppLayout from "@/components/layouts/AppLayout";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/solid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Update() {
  return (
    <AppLayout>
      <h1 className="font-bold text-2xl">Update User</h1>
      <form action="">
        <div className="mt-10 rounded-xl border border-gray-200 bg-white shadow-md dark:bg-[#081028]">
          <div className="flex md:flex-row flex-col-reverse justify-between items-center px-[23px] py-[17px] border-b border-gray-200 gap-5">
            <p className="font-medium">User Information</p>
            <button className="bg-[#515DEF] text-white px-[20px] py-[10px] rounded-[8px] flex flex-row gap-[8px] justify-items-center items-center group w-full md:w-52 md:items-center md:justify-center">
              <ArrowLeftIcon className="w-3 h-3 group-hover:-translate-x-1  transition-all duration-300 ease-in-out" />
              Back to Users
            </button>
          </div>
          <div className="flex flex-col p-6 gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">
                Name 
                <span className="text-red-500">*</span>
              </label>
              <input 
              name="name"
              placeholder="Your name"
              className="w-full h-12 border-[1px] border-gray-200 rounded-[5px] focus:outline-none p-2 dark:bg-[#081028]"/>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">
                Email 
                <span className="text-red-500">*</span>
              </label>
              <input 
              name="email"
              placeholder="example@email.com"
              className="w-full h-12 border-[1px] border-gray-200 rounded-[5px] focus:outline-none p-2 dark:bg-[#081028]"/>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone_number">
                Phone Number 
                <span className="text-red-500">*</span>
              </label>
              <input 
              name="phone_number"
              placeholder="08XXXXXXX"
              className="w-full h-12 border-[1px] border-gray-200 rounded-[5px] focus:outline-none p-2 dark:bg-[#081028]"/>
            </div>
            <div className="flex flex-col gap-1">
              <label>Role <span className="text-red-500">*</span></label>
              <Select>
                <SelectTrigger className="w-full h-12 border-[1px] border-gray-200 rounded-[5px] focus:outline-none px-2">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Admin</SelectItem>
                  <SelectItem value="dark">Engineer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
          <div className="flex justify-center md:justify-end pr-5">
            <button className="bg-[#515DEF] text-white py-[10px] w-full md:w-40 rounded-[8px] mt-10 flex flex-row justify-center items-center gap-2">
              Simpan
              <CheckIcon className="w-4 h-4"/>
            </button>
          </div>
      </form>
    </AppLayout>
  );
}