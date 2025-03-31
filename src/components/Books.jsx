/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style/Books.css'; // Ensure to link the correct CSS file

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books");
        const data = await response.json();
        // console.log(data);  // Debugging: Log the fetched data
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="books-container">
      <h1>Library Catalog</h1>
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="books-list">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-item">
            <Link to={`/books/${book.id}`} className="book-link">
              <div className="book-content">
                <img src={book.coverimage} alt={book.title} className="book-image" />
                <div className="book-details">
                  <h2>{book.title}</h2>
                  <p>{book.author}</p>
                  <div className="availability">
               
                    {book.available ? "Available to Reserve" : "Not Available"}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
