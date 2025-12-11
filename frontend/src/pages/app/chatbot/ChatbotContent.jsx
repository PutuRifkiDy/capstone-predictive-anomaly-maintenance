import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import SidebarOpenContext from "@/context/SidebarOpenContext";
import useInput from "@/hooks/useInput";
import {
  chatCopilot,
  deleteAllChatLogsByUserId,
  deleteChatLogById,
  getChatLogsCopilotByUserId,
} from "@/utils/api";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  ClipboardDocumentCheckIcon,
  CpuChipIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

export default function ChatbotContent({ authedUser }) {
  const context = useContext(SidebarOpenContext);
  // const [loading, setLoading] = useState(false);
  const [inputMessage, onInputMessageChange, setInputMessage] = useInput();
  const [chatHistory, setChatHistory] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await getChatLogsCopilotByUserId(params.id);
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
  }, [params.id]);

  // const handleSendMessage = async (event) => {
  //   event.preventDefault();

  //   if (inputMessage.trim() === "") {
  //     toast.error("Please enter a message");
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const response = await chatCopilot({
  //       message: inputMessage,
  //       userId: authedUser.id,
  //     });

  //     if (response.error) {
  //       toast.error(response.message);
  //     } else {
  //       setInputMessage("");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (inputMessage.trim() === "") {
      toast.error("Please enter a message");
      return;
    }

    const userTemp = {
      id: "temp-user",
      sender_type: "user",
      message: inputMessage,
    };

    const agentLoadingTemp = {
      id: "temp-loading",
      sender_type: "agent",
      message: "Thinking",
      loading: true,
    };

    setChatHistory((prev) => [...prev, userTemp, agentLoadingTemp]);

    setInputMessage("");

    try {
      const response = await chatCopilot({
        message: inputMessage,
        userId: authedUser.id,
      });

      if (response.error) {
        toast.error(response.message);
      }

      setChatHistory((prev) => {
        const withoutTempLoading = prev.filter(
          (msg) => msg.id !== "temp-loading"
        );

        const agentReal = {
          id: response.data.id,
          sender_type: "agent",
          message: response.data.message,
          loading: false,
        };

        return [...withoutTempLoading, agentReal];
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAllChatLog = async () => {
    try {
      const response = await deleteAllChatLogsByUserId(params.id);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        setChatHistory([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteChatLog = async (id) => {
    try {
      const response = await deleteChatLogById(id);
      console.log(response);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        setChatHistory(chatHistory.filter((chat) => chat.id != id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const copyClipboard = (message) => {
    try {
      const result = navigator.clipboard.writeText(message);
      console.log(result);
      toast.success("Copied to clipboard");
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="bg-[#515DEF] hover:bg-[#515DEF]/90 dark:text-white"
                >
                  Clear All Chat
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    Are you sure to delete all of chat logs?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteAllChatLog()}
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {chatHistory.map((message, index) => (
              <>
                {message.loading ? (
                  <div
                    className={`flex items-center gap-4 ${
                      message.sender_type == "agent"
                        ? "justify-start"
                        : "justify-end"
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
                          : authedUser.name}
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
                          } font-medium flex items-center gap-3 `}
                        >
                          {message.message}
                          <span className="w-2 h-2 bg-[#515DEF] rounded-full animate-bounce flex items-center [animation-delay:0.3s]"></span>
                          <span className="w-2 h-2 bg-[#515DEF] rounded-full animate-bounce flex items-center[animation-delay:0.2s]"></span>
                          <span className="w-2 h-2 bg-[#515DEF] rounded-full animate-bounce flex items-center [animation-delay:0.1s]"></span>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex flex-col mb-1">
                    <div
                      className={`flex items-center gap-4 ${
                        message.sender_type == "agent"
                          ? "justify-start"
                          : "justify-end"
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
                            : authedUser.name}
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
                            } text-justify`}
                          >
                            {message.message}
                          </p>
                        </div>
                        {message.sender_type == "agent" && (
                          <div className="flex items-center gap-2 mt-2">
                            <Dialog>
                              <DialogTrigger asChild className="cursor-pointer">
                                <TrashIcon className="w-6 h-6 text-red-500" />
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>
                                    Are you sure to delete this chat logs?
                                  </DialogTitle>
                                  <DialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      handleDeleteChatLog(message.id)
                                    }
                                  >
                                    Confirm
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <DocumentDuplicateIcon
                              className="w-6 h-6 text-gray-500 cursor-pointer"
                              onClick={() => copyClipboard(message.message)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
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
            className="focus-visible:ring-0 py-6 rounded-full pl-5 dark:border-white"
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
