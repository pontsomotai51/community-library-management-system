import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

function Users() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    const existingUsers = savedUsers ? JSON.parse(savedUsers) : [];

    const adminExists = existingUsers.some(
      (user) => user.membershipId === "901020502"
    );

    if (!adminExists) {
      const defaultAdmin = {
        id: Date.now(),
        name: "Library Admin",
        membershipId: "901020502",
        role: "Admin",
        password: "5742",
      };

      return [...existingUsers, defaultAdmin];
    }

    return existingUsers;
  });

  const [name, setName] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Member");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !membershipId || !password || !role) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingId) {
      const updatedUsers = users.map((user) =>
        user.id === editingId
          ? {
              ...user,
              name,
              membershipId,
              role,
            }
          : user
      );

      setUsers(updatedUsers);
      setEditingId(null);

      alert("User updated successfully!");
    } else {
      const newUser = {
        id: Date.now(),
        name,
        membershipId,
        role,
        password,
      };

      setUsers([...users, newUser]);

      alert("User added successfully!");
    }

    setName("");
    setMembershipId("");
    setPassword("");
    setRole("Member");
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setMembershipId(user.membershipId);
    setRole(user.role);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      const updatedUsers = users.filter((user) => user.id !== id);

      setUsers(updatedUsers);

      alert("User deleted successfully!");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setMembershipId("");
    setPassword("");
    setRole("Member");
  };

  return (
    <div>
      <Navigation />

      <main className="page-container">
        <h1>User Management</h1>

        <p className="page-description">
          Add and manage library members and staff.
        </p>

        <div className="form-card">
          <h2>{editingId ? "Update User" : "Add New User"}</h2>

          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter user's name"
              />
            </div>

            <div className="form-group">
              <label>Membership ID</label>

              <input
                type="text"
                value={membershipId}
                onChange={(e) => setMembershipId(e.target.value)}
                placeholder="Enter membership ID"
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            <div className="form-group">
              <label>Role</label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Member">Member</option>
                <option value="Librarian">Librarian</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit" className="primary-button">
                {editingId ? "Update User" : "Add User"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="table-section">
          <h2>User List</h2>

          {users.length === 0 ? (
            <p>No users have been added yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Membership ID</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.membershipId}</td>
                    <td>{user.role}</td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default Users;