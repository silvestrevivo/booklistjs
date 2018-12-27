// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks

class UI {
  // static funcions, why? This class contains the UI tasks and it will be not
  // extended, thus its functions have to be 'isolated'
  static displayBooks() {
    // books stored in LocalStore
    const storedBooks = [
      {
        title: 'title data',
        author: 'author data',
        isbn: 'isbn data'
      }
    ];
    const books = storedBooks;
    // As a map() in React...
    books.forEach((book) => {
      UI.addBookToList(book);
    })
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)
