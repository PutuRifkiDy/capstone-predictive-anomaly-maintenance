import AppLayout from "../../components/layouts/AppLayout";

export default function Dashboard({ authedUser, onLogout }) {
  return (
    <AppLayout authedUser={authedUser} onLogout={onLogout}>
      <p>Dashboard</p>
    </AppLayout>
  );
}
