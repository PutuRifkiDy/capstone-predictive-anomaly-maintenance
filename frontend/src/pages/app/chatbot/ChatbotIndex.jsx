import AppLayout from "@/components/layouts/AppLayout";
import { Input } from "@/components/ui/input";
import useInput from "@/hooks/useInput";
import { chatCopilot } from "@/utils/api";
import { useState } from "react";
import { toast } from "sonner";

export default function ChatbotIndex({ authedUser, onLogout }) {
  const [inputMessage, onInputMessageChange, setInputMessage] = useInput();
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (inputMessage.trim() === "") {
      toast.error("Please enter a message");
      return;
    }

    const userMessage = {
      sender: authedUser.name,
      text: inputMessage,
    };
    setChatHistory((prev) => [...prev, userMessage]);
    setInputMessage("");

    try {
      const response = await chatCopilot({
        message: inputMessage,
        userId: authedUser.id,
      });

      const agentResponse = {
        sender: "agent",
        text: response.data.message,
      };
      console.log(agentResponse);
      setChatHistory((prev) => [...prev, agentResponse]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppLayout authedUser={authedUser} onLogout={onLogout}>
      <div>
        <p className="font-medium text-[32px] tracking-[-0.11px] text-[#000000] dark:text-white">
          Chatbot
        </p>
        <div>
          {chatHistory.map((message, index) => (
            <div key={index}>
              <p className="font-medium text-[#000000] dark:text-white">
                {message.sender}
              </p>
              <p className="text-[#000000] dark:text-white">{message.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <Input
            type="text"
            value={inputMessage}
            onChange={onInputMessageChange}
            placeholder="Type your message here"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </AppLayout>
  );
}
