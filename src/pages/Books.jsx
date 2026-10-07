import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

function Books() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !genre || !isbn || !quantity) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingId) {
      const updatedBooks = books.map((book) =>
        book.id === editingId
          ? {
              ...book,
              title,
              author,
              genre,
              isbn,
              quantity: Number(quantity),
            }
          : book
      );

      setBooks(updatedBooks);
      setEditingId(null);
      alert("Book updated successfully!");
    } else {
      const newBook = {
        id: Date.now(),
        title,
        author,
        genre,
        isbn,
        quantity: Number(quantity),
      };

      setBooks([...books, newBook]);
      alert("Book added successfully!");
    }

    setTitle("");
    setAuthor("");
    setGenre("");
    setIsbn("");
    setQuantity("");
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setIsbn(book.isbn);
    setQuantity(book.quantity);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmDelete) {
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
      alert("Book deleted successfully!");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setAuthor("");
    setGenre("");
    setIsbn("");
    setQuantity("");
  };

  return (
    <div>
      <Navigation />

      <main className="page-container">
        <h1>Book Management</h1>
        <p className="page-description">
          Add, update and manage library books.
        </p>

        <div className="form-card">
          <h2>{editingId ? "Update Book" : "Add New Book"}</h2>

          <form onSubmit={handleSubmit} className="book-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
              />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author"
              />
            </div>

            <div className="form-group">
              <label>Genre</label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Enter genre"
              />
            </div>

            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="Enter ISBN"
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="primary-button">
                {editingId ? "Update Book" : "Add Book"}
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
          <h2>Book List</h2>

          {books.length === 0 ? (
            <p>No books added yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>ISBN</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.isbn}</td>
                    <td>{book.quantity}</td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => handleDelete(book.id)}
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

export default Books;