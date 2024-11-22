document.getElementById('createBookForm').onsubmit = function(event) {
    event.preventDefault();
    const bookData = {
        name: document.getElementById('name').value,
        author: document.getElementById('author').value,
        editorial: document.getElementById('editorial').value,
        publish_year: parseInt(document.getElementById('publish_year').value),
        subject: document.getElementById('subject').value,
        isbn: document.getElementById('isbn').value
    };

    const currentYear = new Date().getFullYear();
    const publishYearInput = document.getElementById('publish_year').value;
    const publishYear = parseInt(publishYearInput);
    if (isNaN(publishYear) || publishYear < 1600 || publishYear > currentYear) {
        alert('Please enter a valid publish year between 1600 and ' + currentYear);
        return; 
    }

    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(bookData);
    localStorage.setItem('books', JSON.stringify(books));

    fetch('https://mybookapi.free.beeceptor.com/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    }).then(response => {
        if (response.ok) {
            alert('Book added successfully!');
            window.location.href = 'index.html';
        } else {
            alert('Failed to add book.');
        }
    });
};


