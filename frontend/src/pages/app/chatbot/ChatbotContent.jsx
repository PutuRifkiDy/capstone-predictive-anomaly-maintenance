import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SidebarOpenContext from "@/context/SidebarOpenContext";
import useInput from "@/hooks/useInput";
import { chatCopilot, getChatLogsCopilot } from "@/utils/api";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CpuChipIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ChatbotContent({ authedUser }) {
  const context = useContext(SidebarOpenContext);
  const [inputMessage, onInputMessageChange, setInputMessage] = useInput();
  const [chatHistory, setChatHistory] = useState([]);

  
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await getChatLogsCopilot();
        console.log(response);
        if (response.error) {
          setChatHistory([]);
        } else {
          setChatHistory(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchChatHistory();
  }, [chatHistory]);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (inputMessage.trim() === "") {
      toast.error("Please enter a message");
      return;
    }
    try {
      const response = await chatCopilot({
        message: inputMessage,
        userId: authedUser.id,
      });

      if (response.error) {
        toast.error(response.message);
      } else {
        setInputMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <div className="mb-24">
        {chatHistory.length == 0 ? (
          <div className="flex flex-col items-center justify-center p-36 gap-5">
            <img
              src="/empty-chatbot-icon.png"
              className="w-24 h-24"
              alt="empty chatbot"
            />
            <p className="font-medium text-[32px] tracking-[-0.11px] text-[#646B72] dark:text-white">
              Predictive Maintenance Copilot
            </p>
          </div>
        ) : (
          <>
            {chatHistory.map((message, index) => (
              <div key={index} className="flex flex-col mb-1">
                <div
                  className={`flex items-center gap-4 ${
                    message.sender_type == "agent" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 p-4 rounded-full ${
                      message.sender_type == "agent"
                        ? "bg-[#515DEF]/30 border-[1px] border-[#515DEF]/10"
                        : "bg-[#515DEF]"
                    } text-white`}
                  >
                    {message.sender_type == "agent" ? (
                      <CpuChipIcon className="w-8 h-8 shrink-0 text-[#515DEF]" />
                    ) : (
                      authedUser.name.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-[#1E293B] dark:text-white">
                      {message.sender_type == "agent"
                        ? "Predicta Chatbot"
                        : message.sender_type}
                    </p>
                    <div
                      className={`p-3 ${
                        message.sender_type == "agent"
                          ? "bg-gray-50 border-[1px] border-gray-200 dark:bg-[#515DEF]/20 dark:border-[#515DEF]/20 relative rounded-r-lg rounded-br-lg"
                          : "bg-[#515DEF] border-[1px] border-[#515DEF]/30 rounded-lg"
                      }`}
                    >
                      {message.sender_type == "agent" && (
                        <div className="absolute -left-1 right-0 h-full w-[5px] bg-[#515DEF] inset-y-0 rounded-tl-md rounded-bl-lg"></div>
                      )}
                      <p
                        className={`${
                          message.sender_type == "agent"
                            ? "text-gray-800 dark:text-white"
                            : "text-white"
                        }`}
                      >
                        {message.message}
                      </p>
                    </div>
                    {message.sender_type == "agent" && (
                      <div className="flex items-center gap-2 mt-2">
                        <TrashIcon className="w-6 h-6 text-red-500" />
                        <DocumentDuplicateIcon className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <form
        onSubmit={handleSendMessage}
        className={`px-4 sm:px-6 lg:px-8 fixed bottom-0 pb-8 z-50 right-0 bg-white dark:bg-[#081028] ${
          context == true ? "lg:left-72 left-0 " : "left-24"
        }`}
      >
        <div className="relative flex gap-3">
          <Input
            type="text"
            className="focus-visible:ring-0 py-6 rounded-full pl-5"
            value={inputMessage}
            onChange={onInputMessageChange}
            placeholder="Checking your machine here..."
          />
          <Button
            variant="none"
            type="submit"
            className="bg-[#515DEF] text-white flex gap-2 items-center absolute right-2 top-1.5 rounded-full outline-none "
          >
            Send
            <PaperAirplaneIcon className="w-5 h-5 text-white transform rotate-30" />
          </Button>
        </div>
      </form>
    </div>
  );
}
