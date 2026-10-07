import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav>
      <h2>Community Library</h2>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/books">Books</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/users">Users</Link>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navigation;