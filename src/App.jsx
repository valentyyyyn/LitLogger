import { useState, useEffect } from 'react';
import { ViewFormButton } from './components/viewFormButton';
import { AddBookForm } from './components/addBookForm';
import { MyBooks } from './components/myBooksFilters';
import { MyBooksContainer } from './components/myBooks';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  const handleDeleteBook = (title) => {
    const updatedBooks = books.filter((book) => book.title !== title);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  const updateCard = (title, updatedBook) => {
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.map((book) =>
        book.title === title ? { ...book, ...updatedBook } : book
      );
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      return updatedBooks;
    });
  };

  return (
    <>
      <header>
        <h1>LitLogger</h1>
        <div className="div-search-and-add">
          <ViewFormButton isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} />
        </div>
        {isFormVisible && <AddBookForm setBooks={setBooks} setIsFormVisible={setIsFormVisible} />}
      </header>

      <main>
        <MyBooks setSearchTerm={setSearchTerm} setFilter={setFilter} />
        <MyBooksContainer books={books} searchTerm={searchTerm} filter={filter} handleDeleteBook={handleDeleteBook} updateCard={updateCard} />
      </main>
    </>
  );
}

export default App;


