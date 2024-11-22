document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isbn = urlParams.get('isbn');
    const books = JSON.parse(localStorage.getItem('books')) || [];

    document.getElementById('deleteButton').onclick = function() {
        if (confirm('Are you sure you want to delete this book?')) {
            const updatedBooks = books.filter(book => book.isbn !== isbn);
            localStorage.setItem('books', JSON.stringify(updatedBooks));
            alert('Book deleted successfully!');
            window.location.href = 'index.html';
        }
    };
});

