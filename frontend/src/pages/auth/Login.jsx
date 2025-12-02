import { useState } from "react";
import CompanyLogo from "../../components/icons/CompanyLogo";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <section className="lg:px-24 md:px-5 px-5 py-5 flex gap-24 lg:justify-between md:justify-center justify-center">
      <div className="flex flex-col lg:w-1/2 md:w-full w-full">
        <header className="flex items-center gap-3">
          <CompanyLogo />
          <p className="font-bold text-[35.33px] leading-[150%] tracking-[-1%]">
            Predicta<span className="text-[#515DEF]">Energy</span>
          </p>
        </header>
        <div className="flex flex-col mt-24">
          <header className="flex flex-col">
            <h4 className="font-semibold text-[40px] text-[#313131]">Login</h4>
            <p className="text-[16px] text-[#313131]">
              <span>Login</span> untuk mengakses pengecekan mesin
            </p>
          </header>
          <form className="mt-10 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[14px] text-[#313131]">
                Email
              </label>
              <input
                name="email"
                placeholder="Masukkan email anda"
                className="border-[1px] px-4 py-2 border-[#79747E] rounded-[4px] focus:outline-none placeholder:text-[#79747E]"
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="text-[14px] text-[#313131]">
                Password
              </label>
              <input
                name="password"
                placeholder="Masukkan password anda"
                type={showPassword ? "text" : "password"}
                className="border-[1px] px-4 py-2 border-[#79747E] rounded-[4px] focus:outline-none placeholder:text-[#79747E]"
              />
              {showPassword ? (
                <EyeIcon
                  className="w-6 h-6 absolute right-3 top-9 text-[#313131] cursor-pointer"
                  onClick={handleShowPassword}
                />
              ) : (
                <EyeSlashIcon
                  className="w-6 h-6 absolute right-3 top-9 text-[#313131] cursor-pointer"
                  onClick={handleShowPassword}
                />
              )}
            </div>
            <button className="bg-[#515DEF] py-2 rounded-[4px] text-white mt-10 hover:shadow-2xl transition-all duration-300 ease-in-out">
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="w-1/2 lg:block md:hidden hidden">
        <img src="/auth/auth-image.png" className="w-full h-auto" />
      </div>
    </section>
  );
}
