import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { getUserLogged, putAccessToken } from "./utils/api";
import { toast } from "sonner";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/app/Dashboard";
import UserIndex from "./pages/app/users/UserIndex";
import UserCreate from "./pages/app/users/UserCreate";
import UserUpdate from "./pages/app/users/UserUpdate";
import ChatbotIndex from "./pages/app/chatbot/ChatbotIndex";
import MaintenanceTicketIndex from "./pages/app/maintenance-tickets/MaintenanceTicketIndex";
import MaintenanceTicketCreate from "./pages/app/maintenance-tickets/MaintenanceTicketCreate";
import MaintenanceTicketUpdate from "./pages/app/maintenance-tickets/MaintenanceTicketUpdate";
import AssignmentMaintenanceIndex from "./pages/app/assign-maintenance-tasks/AssignmentMaintenanceIndex";
import AssignmentMaintenanceCreate from "./pages/app/assign-maintenance-tasks/AssignmentMaintenanceCreate";
import AssignmentEngineerIndex from "./pages/app/engineer-task-assignment/AssignmentEngineerIndex";
import AssignmentEngineerUpdate from "./pages/app/engineer-task-assignment/AssignmentEngineerUpdate";
import MachineLearningIndex from "./pages/app/machine-learning/MachineLearningIndex";

export default function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserLogged();

      if (!result.error) {
        setAuthedUser(result.data);
      }
      setInitializing(false);
    };

    fetchUser();
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const result = await getUserLogged();

    if (result.error == false) {
      setAuthedUser(result.data);
    }

    navigate("/dashboard");
    toast.success("Login is successfully, welcome to the dashboard!");
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
    toast.success("Logout successfully");
    navigate("/login");
  };

  if (initializing) {
    return null;
  }

  if (authedUser == null) {
    return (
      <Routes>
        <Route path="/*" element={<Login loginSuccess={onLoginSuccess} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<Dashboard authedUser={authedUser} onLogout={onLogout} />}
      />
      <Route
        path="/admin/users"
        element={<UserIndex authedUser={authedUser} onLogout={onLogout} />}
      />
      <Route
        path="/admin/users/create"
        element={<UserCreate authedUser={authedUser} onLogout={onLogout} />}
      />
      <Route
        path="/admin/users/update/:id"
        element={<UserUpdate authedUser={authedUser} onLogout={onLogout} />}
      />
      <Route
        path="/maintenance-ticket"
        element={
          <MaintenanceTicketIndex authedUser={authedUser} onLogout={onLogout} />
        }
      />
      <Route
        path="/maintenance-ticket/create"
        element={
          <MaintenanceTicketCreate
            authedUser={authedUser}
            onLogout={onLogout}
          />
        }
      />
      <Route
        path="/maintenance-ticket/update/:id"
        element={
          <MaintenanceTicketUpdate
            authedUser={authedUser}
            onLogout={onLogout}
          />
        }
      />
      <Route
        path="/assignment-maintenance/tasks/:ticketId"
        element={
          <AssignmentMaintenanceIndex
            authedUser={authedUser}
            onLogout={onLogout}
          />
        }
      />
      <Route
        path="/assignment-maintenance/tasks/create/:ticketId"
        element={
          <AssignmentMaintenanceCreate
            authedUser={authedUser}
            onLogout={onLogout}
          />
        }
      />
      <Route
        path="/task-maintenance"
        element={
          <AssignmentEngineerIndex
            authedUser={authedUser}
            onLogout={onLogout}
          />
        }
      />
      <Route
        path="/task-maintenance/:id"
        element={
          <AssignmentEngineerUpdate
            authedUser={authedUser}
            onLogout={onLogout}
          />
        }
      />
      <Route
        path="/chatbot/:id"
        element={<ChatbotIndex authedUser={authedUser} onLogout={onLogout} />}
      />
      <Route
        path="/machine-learning/uploads"
        element={<MachineLearningIndex authedUser={authedUser} onLogout={onLogout}/>}
      />
    </Routes>
  );
}
