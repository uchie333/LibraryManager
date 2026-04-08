const Book = require("../models/book");

// Borrow Book Logic
exports.borrowBook = async (req, res) => {
    try {
        const { studentId, attendantId, returnDate } = req.body;
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ message: "Book not found" });
        if (book.status === "OUT") return res.status(400).json({ message: "Book is already out" });

        book.status = "OUT";
        book.borrowedBy = studentId;
        book.issuedBy = attendantId;
        book.returnDate = returnDate;

        await book.save();
        return res.status(200).json({ message: "Book borrowed successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Return Book Logic
exports.returnBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book || book.status === "IN") return res.status(400).json({ message: "Cannot return this book" });

        book.status = "IN";
        book.borrowedBy = null;
        book.issuedBy = null;
        book.returnDate = null;

        await book.save();
        return res.status(200).json({ message: "Book returned successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get Single Book with Special Populates
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate("authors")
            .populate("borrowedBy")
            .populate("issuedBy");
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};