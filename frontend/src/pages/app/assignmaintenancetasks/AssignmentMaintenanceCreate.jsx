import AppLayout from "@/components/layouts/AppLayout";

export default function AssignmentMaintenanceCreate({ authedUser, onLogout }) {
  return (
    <AppLayout authedUser={authedUser} onLogout={onLogout}>
      <p className="font-medium text-[32px] tracking-[-0.11px] text-[#000000] dark:text-white">
        Assignment Maintenance Tickets
      </p>
    </AppLayout>
  );
}
