import AppLayout from "@/components/layouts/AppLayout";

export default function Create() {
  return (
    <p>Add User</p>
  );
}

Create.layout = (page) => <AppLayout children={page} />;