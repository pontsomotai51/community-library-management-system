import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

function Transactions() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [selectedBook, setSelectedBook] = useState("");
  const [transactionType, setTransactionType] = useState("Borrow");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const handleTransaction = (e) => {
    e.preventDefault();

    if (!selectedBook || quantity < 1) {
      alert("Please select a book and enter a valid quantity.");
      return;
    }

    const amount = Number(quantity);

    const book = books.find(
      (book) => book.id === Number(selectedBook)
    );

    if (!book) {
      alert("Book not found.");
      return;
    }

    if (transactionType === "Borrow" && book.quantity < amount) {
      alert("Not enough books available.");
      return;
    }

    const updatedBooks = books.map((book) => {
      if (book.id === Number(selectedBook)) {
        return {
          ...book,
          quantity:
            transactionType === "Borrow"
              ? book.quantity - amount
              : book.quantity + amount,
        };
      }

      return book;
    });

    const newTransaction = {
      id: Date.now(),
      bookTitle: book.title,
      type: transactionType,
      quantity: amount,
      date: new Date().toLocaleString(),
    };

    setBooks(updatedBooks);
    setTransactions([...transactions, newTransaction]);

    alert("Transaction completed successfully!");

    setSelectedBook("");
    setQuantity(1);
  };

  return (
    <div>
      <Navigation />

      <main className="page-container">
        <h1>Transactions</h1>

        <p className="page-description">
          Manage book borrowing and stock additions.
        </p>

        <div className="form-card">
          <h2>New Transaction</h2>

          {books.length === 0 ? (
            <p>No books are available. Please add books first.</p>
          ) : (
            <form onSubmit={handleTransaction} className="transaction-form">
              <div className="form-group">
                <label>Select Book</label>

                <select
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                >
                  <option value="">-- Select a book --</option>

                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title} - Available: {book.quantity}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Transaction Type</label>

                <select
                  value={transactionType}
                  onChange={(e) =>
                    setTransactionType(e.target.value)
                  }
                >
                  <option value="Borrow">
                    Borrow / Deduct Stock
                  </option>

                  <option value="Add Stock">
                    Add Stock
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Quantity</label>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <button type="submit" className="primary-button">
                Complete Transaction
              </button>
            </form>
          )}
        </div>

        <div className="table-section">
          <h2>Transaction History</h2>

          {transactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.bookTitle}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.date}</td>
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

export default Transactions;