document.addEventListener('DOMContentLoaded', function() {
    displayBooks();

    function fetchBooksFromAPI() {
        fetch('https://mybookapi.free.beeceptor.com/books') 
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                if (data.books && Array.isArray(data.books)) {
                    localStorage.setItem('books', JSON.stringify(data.books)); 
                    displayBooks(data.books); 
                }
            })
            .catch(error => console.error('Error fetching books:', error));
    }

    function displayBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const list = document.getElementById('bookList');
        list.innerHTML = ''; 
        books.forEach(book => {
            const item = document.createElement('li');
            const viewLink = document.createElement('a');
            viewLink.href = `bookDetail.html?isbn=${encodeURIComponent(book.isbn)}`;
            viewLink.textContent = book.name;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = function() {
                window.location.href = `edit.html?isbn=${encodeURIComponent(book.isbn)}`;
            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                if (confirm('Are you sure you want to delete this book?')) {
                    const updatedBooks = books.filter(b => b.isbn !== book.isbn);
                    localStorage.setItem('books', JSON.stringify(updatedBooks));
                    displayBooks();  
                }
            };

            item.appendChild(viewLink);
            item.appendChild(editButton);
            item.appendChild(deleteButton);
            list.appendChild(item);
        });
    }
    
});










