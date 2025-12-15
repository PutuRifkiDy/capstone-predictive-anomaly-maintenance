import AppLayout from "@/components/layouts/AppLayout";
import { runMachineLearningModel, uploadDataset } from "@/utils/api-machine-learning";
// import { runMachineLearningModel, uploadDataset } from "@/utils/api";
import {
  DocumentArrowUpIcon,
  DocumentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function MachineLearningIndex({ authedUser, onLogout }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isLoadingRunModel, setIsLoadingRunModel] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleDeleteFile = () => {
    setFile(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoadingUpload(true);

    const result = await uploadDataset(file);

    setIsLoadingUpload(false);
    if (!result.error) {
      toast.success(result.message);
      setFile(null);
    } else {
      toast.error(result.errorMessage);
    }
  };

  const handleRunModel = async (e) => {
    e.preventDefault();
    setIsLoadingRunModel(true);
    toast.success("Running model..., please wait...", { duration: 5000 });

    const result = await runMachineLearningModel();

    setIsLoadingRunModel(false);
    if (!result.error) {
      toast.success(result.message);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <AppLayout authedUser={authedUser} onLogout={onLogout}>
      <div>
        <p className="font-medium text-[32px] tracking-[-0.11px] text-[#000000] dark:text-white">
          Upload File
        </p>
        <form className="flex flex-col md:flex-row border-[1px] border-gray-200 dark:border-gray-500 rounded-[15px] w-full md:h-[533px] py-[65px] px-[47px] gap-10 mt-10 shadow-sm">
          <div
            className={`border-2 border-dashed rounded-[8px] w-full md:w-1/2 flex flex-col items-center justify-center text-center p-10 transition
              ${
                isDragging
                  ? "border-[#515DEF] bg-blue-50 dark:bg-gray-100/10"
                  : "border-gray-300"
              }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <label
              htmlFor=""
              className="w-full h-full flex flex-col items-center justify-center gap-1"
            >
              <DocumentArrowUpIcon className="w-[80px] h-[80px] text-gray-500 dark:text-white" />
              <p className="text-gray-500 dark:text-white">
                Drag & Drop file here or{" "}
                <span
                  className="text-blue-500 underline cursor-pointer"
                  onClick={() => inputRef.current.click()}
                >
                  Browse File
                </span>
              </p>
              <p className="text-gray-400 dark:text-white">CSV file only</p>
              <input
                type="file"
                className="hidden"
                onChange={handleInputChange}
                ref={inputRef}
              />
            </label>
          </div>
          <div className="flex flex-col w-full md:w-1/2 justify-between gap-5">
            <div className="flex flex-col gap-[29px]">
              <p className="font-medium text-xl">Uploaded file</p>
              {file ? (
                <div className="border-[1px] rounded-[8px] flex  items-center py-[14px] px-[15px] justify-between dark:border-gray-500 border-gray-200">
                  <div className="flex flex-row gap-5 items-center">
                    <img
                      src="/csv_icon.png"
                      alt="csv icon"
                      className="w-[38px] h-[38px]"
                    />
                    <div className="flex flex-col">
                      <p>{file.name}</p>
                      <p className="text-gray-500">
                        {(file.size / 1000000).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <XMarkIcon
                    className="w-[24px] h-[24px] text-gray-500 cursor-pointer"
                    onClick={handleDeleteFile}
                  />
                </div>
              ) : (
                "No file selected"
              )}
            </div>
            {/* <button className="bg-[#515DEF] text-white w-full rounded-[8px] py-[10px]">
              Save
            </button> */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleUpload}
                disabled={!file || isLoadingUpload}
                className={`w-full rounded-[8px] py-[12px] font-medium transition-colors
                  ${
                    !file || isLoadingUpload
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#515DEF] text-white hover:bg-[#3e48c7]"
                  }`}
              >
                {isLoadingUpload ? "Uploading..." : "Upload Dataset"}
              </button>
              <button
                onClick={handleRunModel}
                disabled={isLoadingRunModel}
                className={`w-full rounded-[8px] py-[12px] font-medium transition-colors border-2
                  ${
                    isLoadingRunModel
                      ? "border-gray-300 text-gray-400 cursor-not-allowed"
                      : "border-[#515DEF] text-[#515DEF] hover:bg-blue-50 dark:hover:bg-gray-200/5"
                  }`}
              >
                {isLoadingRunModel ? "Processing..." : "Run Prediction Model"}
              </button>
              <p className="text-gray-400 italic text-[13px]">
                *Upload csv file only and run model prediction first to get
                prediction result after that you can use chatbot to get summary
                of the data
              </p>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
