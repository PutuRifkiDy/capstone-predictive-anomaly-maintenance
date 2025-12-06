import AppLayout from "../../components/layouts/AppLayout";
import MachineIcon from "@/components/icons/MachineIcon";
import MachineNormalIcon from "@/components/icons/MachineNormalIcon";
import MachineErrorIcon from "@/components/icons/MachineErrorIcon";
import AccuracyPredictionIcon from "@/components/icons/AccuracyPredictionIcon";

export default function Dashboard({ authedUser, onLogout }) {
  return (
    <AppLayout authedUser={authedUser} onLogout={onLogout}>
      <p className="font-medium text-[32px] text-[#000000] dark:text-white">
        Dashboard
      </p>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 pt-[45px]">
        <div className="flex flex-row justify-center items-center bg-white dark:bg-[#081028] border-gray-200 border-[1px] rounded-[15px] px-[24px] py-[29px] gap-[35px] shadow-sm">
          <div>
            <p className="text-gray-400">Total Machine</p>
            <p className="font-medium text-[34px]">
              10.000
            </p>
          </div>
          <div className="bg-[#515DEF]/30 rounded-[10px] h-[69px] w-[69px] flex justify-center items-center">
            <MachineIcon />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center bg-white dark:bg-[#081028] border-gray-200 border-[1px] rounded-[15px] px-[24px] py-[29px] gap-[35px] shadow-sm">
          <div>
            <p className="text-gray-400">Normal Machine</p>
            <p className="font-medium text-[34px]">
              9.300
            </p>
          </div>
          <div className="bg-[#4AD991]/30 rounded-[10px] h-[69px] w-[69px] flex justify-center items-center">
            <MachineNormalIcon />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center bg-white dark:bg-[#081028] border-gray-200 border-[1px] rounded-[15px] px-[24px] py-[29px] gap-[35px] shadow-sm">
          <div>
            <p className="text-gray-400">Troubled Machine</p>
            <p className="font-medium text-[34px]">
              700
            </p>
          </div>
          <div className="bg-[#FF6F6F]/30 rounded-[10px] h-[69px] w-[69px] flex justify-center items-center">
            <MachineErrorIcon />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center bg-white dark:bg-[#081028] border-gray-200 border-[1px] rounded-[15px] px-[24px] py-[29px] gap-[35px] shadow-sm">
          <div>
            <p className="text-gray-400">Prediction Accuracy</p>
            <p className="font-medium text-[34px]">
              87%
            </p>
          </div>
          <div className="bg-[#FEC53D]/30 rounded-[10px] h-[69px] w-[69px] flex justify-center items-center">
            <AccuracyPredictionIcon />
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-[40px] gap-10">
        <div className="bg-white dark:bg-[#081028] border-gray-200 border-[1px] rounded-[15px] px-[24px] py-[29px] shadow-sm w-1/3 h-[429px]">
          <p className="font-medium text-[20px]">Fail Type Distribution</p>
          <p>Pie Chart</p>
        </div>
        <div className="bg-white dark:bg-[#081028] border-gray-200 border-[1px] rounded-[15px] px-[24px] py-[29px] w-2/3 shadow-sm">
          <p className="font-medium text-[20px]">Temperature Graph</p>
          <p>Line Chart</p>
        </div>
      </div>
      <div className="bg-white dark:bg-[#081028] border-gray-200 border-[1px] rounded-[15px] mt-[40px] px-[24px] py-[29px] h-[429px]">
        <p>Ticketing</p>
      </div>
    </AppLayout>
  );
}
