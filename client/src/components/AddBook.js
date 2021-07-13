import React from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../quearies/quearies";

const AddBook = (props) => {
  const authorList = () => {
    let data = props.data;
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
  return (
    <div>
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Genre</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Author name:</label>
          <select>
            <option>Select author</option>
            {authorList()}
          </select>
        </div>

        <button>Add</button>
      </form>
    </div>
  );
};

export default graphql(getAuthorsQuery)(AddBook);
