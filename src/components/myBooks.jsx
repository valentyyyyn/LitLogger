import { useState } from "react";
import { BooksCards } from "./booksCards";
import "./myBooks.css";
import { MyBooks } from "./myBooksFilters";

export function MyBooksContainer({ books, searchTerm, filter, handleDeleteBook, updateCard }) {
  const filteredBooks = books.filter((book) => {
    const searchMatch = !searchTerm || 
      book.title.toLowerCase().includes(searchTerm) || 
      book.author.toLowerCase().includes(searchTerm);
  
    const filterMatch =
      filter === "" ||
      filter === "all" ||
      (filter === "read" && book.readStatus.toLowerCase() === "read") ||
      (filter === "reading" && book.readStatus.toLowerCase() === "reading") ||
      (filter === "moreStars" && book.rate >= 3) ||
      (filter === "lessStars" && book.rate < 3);
  
    return searchMatch && filterMatch;
  });
  

  return (
    <div className="my-books">
      {filteredBooks.length === 0 ? (
        <p className="no-books-added">No books match your search.</p>
      ) : (
        filteredBooks.map((book, index) => (
          <BooksCards key={index} {...book} handleDeleteBook={handleDeleteBook} updateCard={updateCard} />
        ))
      )}
    </div>
  );
} 
