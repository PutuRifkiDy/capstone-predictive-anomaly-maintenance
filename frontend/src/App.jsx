import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { getUserLogged, putAccessToken } from "./utils/api";
import { toast } from "sonner";
import Login from "./pages/auth/Login";
import Index from "./pages/app/users/Index";
import Create from "./pages/app/users/Create";
import Update from "./pages/app/users/Update";
import Dashboard from "./pages/app/Dashboard";

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
        element={<Index authedUser={authedUser} onLogout={onLogout} />}
      />
      <Route
        path="/admin/users/create"
        element={<Create authedUser={authedUser} onLogout={onLogout} />}
      />
      <Route
        path="/admin/users/update"
        element={<Update authedUser={authedUser} onLogout={onLogout} />}
      />
      {/* <Route
        path="/login"
        element={<Dashboard authedUser={authedUser} onLogout={onLogout} />}
      /> */}
    </Routes>
  );
}
