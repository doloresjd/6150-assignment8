document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isbn = urlParams.get('isbn');
    const details = document.getElementById('bookDetails');


    if (isbn) {
        fetch(`https://mybookapi.free.beeceptor.com/books/${isbn}`)
            .then(response => response.json())
            .then(book => {
                const details = document.getElementById('bookDetails');
                if (book) {
                    details.innerHTML = `
                        <p><strong>Name:</strong> ${book.name}</p>
                        <p><strong>Author:</strong> ${book.author}</p>
                        <p><strong>Editorial:</strong> ${book.editorial}</p>
                        <p><strong>Publish_year:</strong> ${book.publish_year}</p>
                        <p><strong>Subject:</strong> ${book.subject}</p>
                        <p><strong>ISBN:</strong> ${book.isbn}</p>
                    `;
                } else {
                    details.innerHTML = '<p>Book not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error loading the book details:', error);
                details.innerHTML = '<p>Error loading book details.</p>';
            });
    } else {
        details.innerHTML = '<p>No ISBN provided.</p>';
    }
});

