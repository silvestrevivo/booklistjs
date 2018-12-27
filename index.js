// * Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// * UI Class: Handle UI Tasks
class UI {
  // static funcions, why? This class contains the UI tasks and it will be not
  // extended, thus its functions have to be 'isolated'
  static displayBooks() {
    // books stored in LocalStore
    const books = Store.getBooks();
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

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#form-book');
    container.insertBefore(div, form);
    // Vanish in 3 seconds
    setTimeout(() => {
      document.querySelector('.alert').remove()
    }, 2500)
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove()
    }
  }
}

// * Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// * Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// * Event: Add a Book
document.querySelector('#form-book').addEventListener('submit', event => {
  event.preventDefault()
  // Get from values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validation
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please, fill in all the fields', 'danger')
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);

    // Add book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Success Message
    UI.showAlert('Book Added', 'success')

    // Clear Flieds on UI
    UI.clearFields()
  }
})

// * Event: Remove a book
document.querySelector('#book-list').addEventListener('click', event => {
  // Remove book from UI
  UI.deleteBook(event.target);

  // Remove book from store
  Store.removeBook(event.target.parentElement.previousElementSibling.textContent);

  // Success Message
  UI.showAlert('Book Removed', 'success')
})
