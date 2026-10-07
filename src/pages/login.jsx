import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [membershipId, setMembershipId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const enteredId = membershipId.trim();
    const enteredPassword = password.trim();

    const savedUsers = localStorage.getItem("users");

    if (!savedUsers) {
      alert("No users are saved in the system.");
      return;
    }

    let users;

    try {
      users = JSON.parse(savedUsers);
    } catch (error) {
      alert("There is a problem with the saved user data.");
      return;
    }

    const user = users.find(
      (user) => String(user.membershipId).trim() === enteredId
    );

    if (!user) {
      alert("Membership ID not found.");
      return;
    }

    if (!user.password) {
      alert("This user does not have a password saved.");
      return;
    }

    if (String(user.password).trim() !== enteredPassword) {
      alert("Membership ID found, but the password is incorrect.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Community Library</h1>

        <p>Library Management System</p>

        <form onSubmit={handleLogin}>
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

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;