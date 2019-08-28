import React from "react";

function BookRow(props) {
  const book = props.book;
  const authors = props.book.authors;
  return (
    <tr>
      <td>{book.title}</td>
      <td>
        {authors.map(author => (
          <span>{author.name}</span>
        ))}
      </td>
      <td>
        <button className="btn" style={{ backgroundColor: book.color }} />
      </td>
    </tr>
  );
}

export default BookRow;
