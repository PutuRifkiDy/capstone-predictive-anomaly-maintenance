import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-36 md:px-0 px-5">
        <div className="flex flex-row gap-5 justify-center items-center">
          <div className="relative">
            <span
              className="block text-5xl lg:text-7xl font-normal text-[#0303ef] leading-none"
              style={{ fontFamily: "Arrintika Signature, cursive" }}
              data-aos="fade-up"
              data-aos-duration="400"
            >
              Error
            </span>
            <h1
              data-aos="fade-up"
              data-aos-duration="600"
              className="uppercase text-5xl lg:text-7xl tracking-tighter font-extrabold text-[#5D5FEF] leading-none -mt-2 lg:-mt-4 font-poppins"
            >
              404
            </h1>
          </div>
        </div>

        <h1 className="font-bold text-[35px] text-[#3A3A3A] dark:text-white text-center mt-10">
          Page Not Found
        </h1>
        <p className="text-[#3A3A3A] text-xl dark:text-white text-center">
          Sorry, the page you are looking for was not found.
        </p>
        <Button
          variant="default"
          type="button"
          className="px-6 py-6 my-10"
          asChild
        >
          <Link
            to="/dashboard"
            className="text-white font-medium rounded-[5px] text-xl group"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-[-5px]" />
            Back to Dashboard
          </Link>
        </Button>
        <p className="text-[#A4A3A3] text-xl text-center">
          © Predictive Maintenance Copilot 2025
        </p>
      </div>
    </>
  );
}
