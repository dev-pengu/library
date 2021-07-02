let myLibrary = [new Book('The Hobbit', 'J.R.R. Tolkien', 300, true)];
var table;
var tableContainer;
var formContainer;

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.info = () => {
	return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'read' : 'not read yet'}`;
}

const addBookToLibrary = (title, author, pages, read) => {
	var book = new Book(title, author, pages, read);
	myLibrary.push(book);
}

const displayLibrary = () => {
	var tableBody = document.querySelector('tbody');
	while(tableBody.lastChild) {
		tableBody.removeChild(tableBody.lastChild);
	}
	
	myLibrary.forEach((book, index) => {
		
		var row = document.createElement('tr');
		var title = document.createElement('td');
		title.textContent = book.title;
		var author = document.createElement('td');
		author.textContent = book.author;
		var pages = document.createElement('td');
		pages.textContent = book.pages;
		var read = document.createElement('td');
		read.textContent = read ? 'X' : '';
		
		var actions = document.createElement('td');
		var removeButton = document.createElement('span');
		removeButton.classList.add('btn', 'red');
		removeButton['id'] = `r_${index}`;
		removeButton.textContent = 'remove';
		var editButton = document.createElement('span');
		editButton.classList.add('btn', 'camel');
		editButton['id'] = `e_${index}`;
		editButton.textContent = 'edit';
		actions.appendChild(removeButton);
		actions.appendChild(editButton);
		
		row.appendChild(title);
		row.appendChild(author)
		row.appendChild(pages);
		row.appendChild(read);
		row.appendChild(actions);
		tableBody.appendChild(row);
	})
}

const handleTableClick = (e) => {
	if (e.target.id.startsWith('r_')) {
		var index = +e.target.id.slice(2);
		myLibrary.splice(index, 1);
		displayLibrary();
	} else if (e.target.id.startsWith('e_')) {
		var index = +e.target.id.slice(2);
		loadData(index);
		showHideElements(formContainer, tableContainer)
	}
}

const loadData = (index) => {
	
}

const showHideElements = (showElem, hideElem) => {
	showElem.classList.remove('hidden');
	hideElem.classList.add('hidden');
}
window.addEventListener('DOMContentLoaded', () => {
	table = document.querySelector('table');
	tableContainer = document.querySelector('#data-container');
	formContainer = document.querySelector('#form-container');
	displayLibrary();
	table.addEventListener('click', handleTableClick);
})
