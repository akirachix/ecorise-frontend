
import React, { useEffect, useState } from "react";
import { fetchUsers } from "./utils"; 

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        setError(error.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Users List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id || user.id}>
              {  }
              {user.name || user.username || user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
