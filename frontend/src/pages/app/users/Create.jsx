import AppLayout from "@/components/layouts/AppLayout";
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useInput from "@/hooks/useInput";
import { addUser } from "@/utils/api";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";

export default function Create({ authedUser, onLogout }) {
  const [name, onNameChange, setName] = useInput("");
  const [email, onEmailChange, setEmail] = useInput("");
  const [phoneNumber, onPhoneNumberChange, setPhoneNumber] = useInput("");
  const [password, onPasswordChange, setPassword] = useInput("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!name || !email || !password || !phoneNumber || !role) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const result = await addUser({
        name,
        email,
        phone_number: phoneNumber,
        role,
        password,
      });
      if (result.error) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        setName("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setRole("");
        navigate("/admin/users");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout authedUser={authedUser} onLogout={onLogout}>
      <p className="font-medium text-[32px] tracking-[-0.11px] text-[#000000] dark:text-white">
        Create User
      </p>
      <form className="flex flex-col gap-5 mt-5" onSubmit={onSubmitHandler}>
        <div className="rounded-xl border-[1px] border-gray-200">
          <div className="flex md:flex-row flex-col-reverse items-center justify-between lg:px-10 md:px-10 px-3 py-5 md:gap-0 gap-5">
            <p className="font-medium text-[16px]">User Information</p>
            <Link
              to={"/admin/users"}
              className="flex items-center gap-3 md:w-40 w-full px-4 py-2 text-white bg-[#515DEF] rounded-md group"
            >
              <ArrowLeftIcon className="text-white w-3 h-3 group-hover:-translate-x-1 transition-all duration-300 ease-in-out" />
              Back to User
            </Link>
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
              value={name}
              onChange={onNameChange}
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
              value={email}
              onChange={onEmailChange}
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
              value={phoneNumber}
              onChange={onPhoneNumberChange}
            />
          </div>
          <div className="flex flex-col gap-2 md:px-10 px-3 mb-3 ">
            <label
              htmlFor="password"
              className="text-[14px] text-[#202224] flex gap-1 items-center dark:text-gray-400"
            >
              Password
              <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              placeholder="Input your password here"
              className="border-[1px] px-4 py-2 border-[#E6EAED] rounded-[4px] focus:outline-none placeholder:text-gray-400 dark:bg-[#081028]"
              type="password"
              value={password}
              onChange={onPasswordChange}
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
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">Engineer</SelectItem>
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
