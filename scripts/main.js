let myLibrary = [new Book('The Hobbit', 'J.R.R. Tolkien', 300, true)];
var cardsContainer;

function Book(title, author, pages, readPages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.readPages = readPages;
	this.read = read;
}

Book.prototype.info = () => {
	return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'read' : 'not read yet'}`;
}

const addBookToLibrary = (title, author, pages, read) => {
	var book = new Book(title, author, pages, read);
	myLibrary.push(book);
}

const updateDisplay = () => {
	myLibrary.forEach((book, index) => {
		let cardDiv = document.createElement('div');
	});
}

const showHideElements = (showElem, hideElem) => {
	showElem.classList.remove('hidden');
	hideElem.classList.add('hidden');
}

window.addEventListener('DOMContentLoaded', () => {
	cardsContainer = document.querySelector('#cards');
})
