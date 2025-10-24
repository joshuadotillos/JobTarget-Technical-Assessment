"use client";

import { useEffect, useState } from "react";
import CreateUser from "./CreateUser";
import UserCard from "./UserCard";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Users</h1>
        <CreateUser onUserCreated={fetchUsers} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
