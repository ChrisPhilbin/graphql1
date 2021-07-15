import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../quearies/quearies";
import BookDetails from "./BookDetails";

const BookList = (props) => {
  let [selected, setSelected] = useState("");

  const displayBooks = () => {
    let data = props.data;
    if (data.loading) {
      return <div>Loading the list of books</div>;
    } else {
      return data.books.map((book) => {
        return (
          <li key={book.id} onClick={() => setSelected(book.id)}>
            {book.name}
          </li>
        );
      });
    }
  };
  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
