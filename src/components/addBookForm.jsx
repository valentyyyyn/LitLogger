import { useState } from "react";
import "./addBookForm.css";

export function AddBookForm({ setIsFormVisible, setBooks }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [readStatus, setReadStatus] = useState("reading");

  const OPEN_LIBRARY_API = "https://openlibrary.org/search.json?q=";
  const DEFAULT_COVER = "https://via.placeholder.com/128x193.png?text=No+Cover";

  const handleSearch = async (book) => {
    setSearchTerm(book);

    if (book.length < 3) {
      setSearchResult([]);
      return;
    }

    try {
      const response = await fetch(`${OPEN_LIBRARY_API}${encodeURIComponent(book)}`);
      const data = await response.json();
      setSearchResult(data.docs || []);
    } catch (Error) {
      console.log("book fetching error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedBook) {
      alert("Please select a book from the list!");
      return;
    }

    const bookData = selectedBook;
    const coverId = bookData.cover_i;
    const coverUrl = coverId 
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : DEFAULT_COVER;

    console.log("Selected Book Data:", selectedBook);
    console.log("Final Cover URL:", coverUrl);

    const newBook = {
      title: bookData.title,
      author: bookData.author_name?.join(", ") || "Unknown",
      year: bookData.first_publish_year || "Unknown",
      bookCover: coverUrl,
      review: e.target.review.value,
      rate: e.target.rate.value,
      readStatus: readStatus,
    };

    setBooks((prevBooks) => {
      const updatedBooks = [...prevBooks, newBook];
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      return updatedBooks;
    });

    setIsFormVisible(false);
  };

  return (
    <form className="book_form modal" onSubmit={handleSubmit}>
      <fieldset id="title-author-fields">
        <label htmlFor="title">Book</label>
        <input
          type="text"
          id="title"
          name="title"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search a book..."
          required
        />

        {searchResult.length > 0 && (
          <ul className="form-search-result">
            {searchResult.map((book, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearchTerm(book.title);
                  setSelectedBook(book);
                  setSearchResult([]);
                }}
              >
                {book.title}
              </li>
            ))}
          </ul>
        )}

        <label htmlFor="review">Review</label>
        <textarea id="review" name="review" required></textarea>
      </fieldset>

      <fieldset>
        <label htmlFor="rate">Rate</label>
        <select id="rate" name="rate">
          <option value="1">⭐ 1 star</option>
          <option value="2">⭐⭐ 2 stars</option>
          <option value="3">⭐⭐⭐ 3 stars</option>
          <option value="4">⭐⭐⭐⭐ 4 stars</option>
          <option value="5">⭐⭐⭐⭐⭐ 5 stars</option>
        </select>
      </fieldset>

      <fieldset id="read-status">
        <label htmlFor="read">Read</label>
        <input
          type="radio"
          id="read"
          name="read-status"
          value="read"
          checked={readStatus === "read"}
          onChange={() => setReadStatus("read")}
        />

        <label htmlFor="reading">Reading</label>
        <input
          type="radio"
          id="reading"
          name="read-status"
          value="reading"
          checked={readStatus === "reading"}
          onChange={() => setReadStatus("reading")}
        />
      </fieldset>

      <button id="addBookButton" type="submit">
        Add Book
      </button>
      <button
        id="closeFormButton"
        type="button"
        onClick={() => setIsFormVisible(false)}
      >
        Close
      </button>
    </form>
  );
}
