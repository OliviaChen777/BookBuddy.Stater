/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/Account.css';

const Account = () => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming you have the token saved in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAccountDetails = async () => {
      try {
        const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
        setReservations(data.reservations); // This should contain the list of reserved books
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchAccountDetails();
  }, [navigate]);

  // Function to handle returning a book
  const handleReturnBook = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to return a book.");
      return;
    }
  
    try {
    
      const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Error: ${errorText}`);
      }
  
      // Remove the book from the reservations list
      setReservations(reservations.filter((book) => book.id !== bookId));
      alert("Book returned successfully!");
    } catch (error) {
      console.error("Error returning the book:", error);
      alert("An error occurred while returning the book. Please try again.");
    }
  };
  
  
  

  if (!user) return <div>Loading...</div>;

  return (
    <div className="account-container">
      <h1 className="account-header">Account Page</h1>
      <div className="account-info">
        <p>Username: {user.firstname} {user.lastname}</p>
        <p>Email: {user.email}</p>
      </div>

      <h2 className="reservations-title">Borrowed Books</h2>
      {reservations.length === 0 ? (
        <p className="no-reservations">You have no books borrowed.</p>
      ) : (
        <ul className="reservations-list">
          {reservations.map((book) => (
            <li key={book.id} className="reservation-item">
              <div>
                <strong>{book.title}</strong> by {book.author}
              </div>
              <button
                className="return-btn"
                onClick={() => handleReturnBook(book.id)}
              >
                Return Book
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Account;
