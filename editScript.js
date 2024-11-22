document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isbn = urlParams.get('isbn');
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books.find(b => b.isbn === isbn);

    if (book) {
        document.getElementById('name').value = book.name;
        document.getElementById('author').value = book.author;
        document.getElementById('editorial').value = book.editorial;
        document.getElementById('publish_year').value = book.publish_year;
        document.getElementById('subject').value = book.subject;
        document.getElementById('isbn').value = book.isbn;
    }

    document.getElementById('editBookForm').onsubmit = function(event) {
        event.preventDefault();
        book.name = document.getElementById('name').value;
        book.author = document.getElementById('author').value;
        book.editorial = document.getElementById('editorial').value;
        book.publish_year = parseInt(document.getElementById('publish_year').value);
        book.subject = document.getElementById('subject').value;
        book.isbn = document.getElementById('isbn').value;

        localStorage.setItem('books', JSON.stringify(books));
        alert('Book updated successfully!');
        window.location.href = 'index.html';
    };
});


