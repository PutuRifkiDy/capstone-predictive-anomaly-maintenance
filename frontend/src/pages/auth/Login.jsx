import { useState } from "react";
import CompanyLogo from "../../components/icons/CompanyLogo";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { login } from "../../utils/api";
import useInput from "@/hooks/useInput";
import { toast } from "sonner";

export default function Login({ loginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (email.trim() == "" || password.trim() == "") {
      toast.warning("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      const result = await login({ email, password });
      if (result.error) {
        toast.error("Login failed, please check your credentials");
      } else {
        loginSuccess(result.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="lg:px-24 md:px-5 px-5 py-5 flex gap-24 lg:justify-between md:justify-center justify-center">
      <div className="flex flex-col lg:w-1/2 md:w-full w-full">
        <header className="flex items-center gap-3 shrink-0 h-24">
          <img
            src="/prevo-logo-with-text.png"
            className="w-auto h-full"
            alt=""
          />
        </header>
        <div className="flex flex-col mt-24">
          <header className="flex flex-col">
            <h4 className="font-semibold text-[40px] text-[#313131]">Login</h4>
            <p className="text-[16px] text-[#313131]">
              <span>Login</span> untuk mengakses pengecekan mesin
            </p>
          </header>
          <form className="mt-10 flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[14px] text-[#313131]">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={onEmailChange}
                placeholder="Masukkan email anda"
                className="border-[1px] px-4 py-2 border-[#E6EAED] rounded-[4px] focus:outline-none placeholder:text-[#79747E]"
                required
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="text-[14px] text-[#313131]">
                Password
              </label>
              <input
                name="password"
                value={password}
                onChange={onPasswordChange}
                placeholder="Masukkan password anda"
                type={showPassword ? "text" : "password"}
                className="border-[1px] px-4 py-2 border-[#E6EAED] rounded-[4px] focus:outline-none placeholder:text-[#79747E]"
                required
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
            <button
              type="submit"
              disabled={loading}
              className="bg-[#515DEF] py-2 rounded-[4px] text-white mt-10 hover:shadow-2xl transition-all duration-300 ease-in-out disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
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
