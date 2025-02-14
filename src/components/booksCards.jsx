import { useState, useEffect } from "react";
import "./booksCards.css";

export function BooksCards({
  bookCover,
  readStatus,
  title,
  year,
  author,
  review,
  rate,
  handleDeleteBook,
  updateCard,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newReview, setNewReview] = useState(review);
  const [newRate, setNewRate] = useState(rate);
  const [newStatus, setNewStatus] = useState(readStatus);

  useEffect(() => {
    setNewReview(review);
    setNewRate(rate);
    setNewStatus(readStatus);
  }, [review, rate, readStatus]);

  const getStars = (rate) => "⭐".repeat(rate);

  const handleSave = () => {
    updateCard(title, { review: newReview, rate: newRate, readStatus: newStatus });
    setIsEditing(false);
  };

  return (
    <div className="cards-first-container">
      <div className="cards">
        <div className="card-cover-container">
          <img className="card-cover" src={bookCover} alt={title} />
        </div>

        <div className={`card-read-status ${newStatus.toLowerCase()}`}>
          <p>{newStatus}</p>
        </div>

        <div className="card-info">
          <h2 className="card-title">{title}</h2>
          <h3 className="card-author-and-year">
            {author} - {year}
          </h3>

          {isEditing ? (
            <section className="edit-mode">
              <textarea 
                value={newReview} 
                placeholder="Edit review..." 
                onChange={(e) => setNewReview(e.target.value)} 
              />
              
              <select value={newRate} onChange={(e) => setNewRate(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{`${"⭐".repeat(n)} ${n} stars`}</option>
                ))}
              </select>
              
              <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="Reading">Reading</option>
                <option value="Read">Read</option>
              </select>

              <button className="save-edit-button" onClick={handleSave}>Guardar</button>
            </section>
          ) : (
            <>
              <p>{newReview}</p>
              <p className="card-rate">{getStars(newRate)}</p>
            </>
          )}
        </div>
      </div>

      <section className="card-buttons">
        <button className="delete-button" onClick={() => handleDeleteBook(title)}>
            <img src={`/Vector.png`} alt="Delete" />
        </button>

        <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
            <img src={`/tabler_edit.png`} alt="Edit symbol icon" />
        </button>
      </section>
    </div>
  );
}
