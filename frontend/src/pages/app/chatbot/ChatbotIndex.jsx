import AppLayout from "@/components/layouts/AppLayout";
import ChatbotContent from "./ChatbotContent";

export default function ChatbotIndex({ authedUser, onLogout }) {
  return (
    <AppLayout authedUser={authedUser} onLogout={onLogout}>
      <ChatbotContent authedUser={authedUser} />
    </AppLayout>
  );
}
