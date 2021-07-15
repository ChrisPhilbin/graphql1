import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  getAuthorsQuery,
  addNewBookMutation,
  getBooksQuery,
} from "../quearies/quearies";

const AddBook = (props) => {
  let [bookName, setBookName] = useState("");
  let [bookGenre, setBookGenre] = useState("");
  let [bookAuthorId, setBookAuthorId] = useState("");

  const authorList = () => {
    let data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.addNewBookMutation({
      variables: {
        name: bookName,
        genre: bookGenre,
        authorId: bookAuthorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };
  return (
    <div>
      <form id="add-book" onSubmit={submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(e) => setBookName(e.target.value)} />
        </div>

        <div className="field">
          <label>Genre</label>
          <input type="text" onChange={(e) => setBookGenre(e.target.value)} />
        </div>

        <div className="field">
          <label>Author name:</label>
          <select
            value={bookAuthorId}
            onChange={(e) => setBookAuthorId(e.target.value)}
          >
            <option>Select author</option>
            {authorList()}
          </select>
        </div>

        <button>Add</button>
      </form>
    </div>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addNewBookMutation, { name: "addNewBookMutation" })
)(AddBook);
