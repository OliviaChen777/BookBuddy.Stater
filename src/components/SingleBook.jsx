/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../style/SingleBook.css';

const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleReserve = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: book.id }),
      });

      if (response.ok) {
        alert("Book reserved successfully!");
        navigate("/account");
      } else {
        alert("Failed to reserve the book.");
      }
    } catch (error) {
      console.error("Error reserving the book:", error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.coverimage} alt={book.title} width="200" />
      <h2>{book.author}</h2>
      <p>{book.description}</p>
      {book.available ? (
        <button onClick={handleReserve}>Reserve this book</button>
      ) : (
        <p>This book is currently unavailable.</p>
      )}
    </div>
  );
};

export default SingleBook;
