import "./myBooksFilters.css"

export function MyBooks({ setSearchTerm, setFilter }) {
  return (
    <div className="my-books-filters">
      <img src="/search.svg" alt="search icon" />

      <select id="my-books-filter" onChange={(e) => setFilter(e.target.value)}>
        <option value="">Filters</option>
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="reading">Reading</option>
        <option value="moreStars">More stars</option>
        <option value="lessStars">Less stars</option>
      </select>

      <input
        id="search-bar"
        type="text"
        placeholder="Title or author..."
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />
    </div>
  );
}