import { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";
import type { User } from "./types/user";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddUser = (user: User) => {
    setUsers((prev) => [
      ...prev,
      { ...user, id: (prev.length + 1).toString() },
    ]);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setUsers((current) => current.filter((e) => e.id !== id));
      if (selectedUser?.id === id) setSelectedUser(null);
    }
  };

  const handleUpdate = (updatedUser: User) => {
    setUsers((current) =>
      current.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setSelectedUser(null);
  };

  return (
    <>
      <UserForm onAdd={handleAddUser} />
      <UserList
        users={users}
        onDelete={handleDelete}
        onView={(user) => setSelectedUser(user)}
        onEdit={(user) => setSelectedUser(user)}
      />
      {selectedUser && (
        <UserProfile user={selectedUser} onUpdate={handleUpdate} />
      )}
    </>
  );
};

export default App;
