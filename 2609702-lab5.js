const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];

// GET /whoami
app.get('/whoami', (req, res) => {
    res.status(200).json({
        studentNumber: '2609702'
    });
});

// GET /books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// GET /books/:id
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    res.status(200).json(book);
});

// POST /books
app.post('/books', (req, res) => {
    const { id, title, details } = req.body;

    if (!id || !title) {
        return res.status(400).json({
            error: 'Missing required fields'
        });
    }

    const newBook = {
        id,
        title,
        details: Array.isArray(details) ? details : []
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

// PUT /books/:id
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    const { title, details } = req.body;

    if (title !== undefined) {
        book.title = title;
    }

    if (details !== undefined) {
        book.details = details;
    }

    res.status(200).json(book);
});

// DELETE /books/:id
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    books.splice(bookIndex, 1);

    res.status(200).json({
        message: 'Book deleted successfully'
    });
});

// POST /books/:id/details
app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    const { id, author, genre, publicationYear } = req.body;

    if (!id || !author || !genre || publicationYear === undefined) {
        return res.status(400).json({
            error: 'Missing required fields'
        });
    }

    const newDetail = {
        id,
        author,
        genre,
        publicationYear
    };

    book.details.push(newDetail);

    res.status(201).json(book);
});

// DELETE /books/:id/details/:detailId
app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({
            error: 'Book or detail not found'
        });
    }

    const detailIndex = book.details.findIndex(d => d.id === req.params.detailId);

    if (detailIndex === -1) {
        return res.status(404).json({
            error: 'Book or detail not found'
        });
    }

    book.details.splice(detailIndex, 1);

    res.status(200).json({
        message: 'Detail deleted successfully'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});