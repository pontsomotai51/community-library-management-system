import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedBooks = localStorage.getItem("books");
    const savedUsers = localStorage.getItem("users");

    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const totalBooks = books.length;

  const availableBooks = books.reduce(
    (total, book) => total + book.quantity,
    0
  );

  const totalUsers = users.length;

  return (
    <div>
      <Navigation />

      <main className="dashboard">
        <h1>Library Dashboard</h1>
        <p className="welcome">
          Welcome to the Community Library Management System
        </p>

        <div className="dashboard-cards">
          <div className="card">
            <h2>Total Books</h2>
            <p>{totalBooks}</p>
          </div>

          <div className="card">
            <h2>Available Books</h2>
            <p>{availableBooks}</p>
          </div>

          <div className="card">
            <h2>Total Users</h2>
            <p>{totalUsers}</p>
          </div>
        </div>

        <div className="table-section">
          <h2>Book Availability</h2>

          {books.length === 0 ? (
            <p>No books have been added yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.quantity}</td>
                    <td>
                      <span
                        className={
                          book.quantity < 2
                            ? "low-stock"
                            : "available"
                        }
                      >
                        {book.quantity < 2
                          ? "Low Stock"
                          : "Available"}
                      </span>
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

export default Dashboard;