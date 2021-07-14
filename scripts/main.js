let myLibrary = [new Book('The Hobbit', 'J.R.R. Tolkien', 300, 200, false), new Book("Harry Potter and the Scorcer's Stone", 'J.K. Rowling', 543, 265, false)];
var cardsContainer;
var totalBooksSpan;
var currentlyReadingSpan;
var booksReadSpan;
var pagesReadSpan;
var bookForm;

var totalBooks = 0;
var currentlyReading = 0;
var booksRead = 0;
var pagesRead = 0;

function Book(title, author, pages, readPages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages || 0;
	this.readPages = readPages || 0;
	this.read = read || false;
}

Book.prototype.info = () => {
	return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'read' : 'not read yet'}`;
}

const addBookToLibrary = (title, author, pages, read) => {
	var book = new Book(title, author, pages, read);
	myLibrary.push(book);
	return book;
}

const initDisplay = () => {
	while (cardsContainer.firstChild) {
		cardsContainer.removeChild(cardsContainer.lastChild);
	}
	if (myLibrary.length == 0) {
		let div = document.createElement('div');
		div.classList.add('w-100','bg-white', 'fs-2', 'text-center');
		div.textContent = "No Books Found";
		cardsContainer.appendChild()
	} else {
		myLibrary.forEach((book, index) => {
			buildCard(book, index);
			totalBooks++;
			if (book.read) {
				booksRead++;
			} else if (book.pages != 0) {
				currentlyReading++;
			}
			pagesRead += book.readPages;
		});
	}
}

const updateStatsDisplay = () => {
	totalBooksSpan.textContent = totalBooks;
	currentlyReadingSpan.textContent = currentlyReading;
	booksReadSpan.textContent = booksRead;
	pagesReadSpan.textContent = pagesRead;
}

const showHideElements = (showElem, hideElem) => {
	showElem.classList.remove('hidden');
	hideElem.classList.add('hidden');
}

const addBook = (e) => {
	var title = document.querySelector('#book-title').value;
	var author = document.querySelector('#book-author').value;
	var pages = +document.querySelector('#book-pages').value;
	var readPages = +document.querySelector('#book-read-pages').value;
	var read = document.querySelector('#book-read').checked;
	
	book = addBookToLibrary(title, author, pages, readPages, read);
	buildCard(book, myLibrary.length - 1);
	totalBooks++;
	if (readPages != 0 && readPages != pages)
		currentlyReading++;
	if (readPages == pages)
		booksRead++;
	pagesRead += readPages;
	updateStatsDisplay();
	bookForm.reset();
}

const sliderChange = (e) => {
	let id = e.target.id.substring(11);
	let queryid = `#page-display-${id}`;
	let label = document.querySelector(queryid);
	label.textContent = e.target.value;
	if (e.target.value == e.target.max) {
		document.querySelector(`#read-ck-${id}`).checked = true;
		myLibrary[id].read = true;
		currentlyReading--;
		booksRead++;
		
	} else if (document.querySelector(`#read-ck-${id}`).checked == true && e.target.value != e.target.max) {
		document.querySelector(`#read-ck-${id}`).checked = false;
		myLibrary[id].read = false;
		booksRead--;
		currentlyReading++;
	}
	pagesRead -= myLibrary[id].readPages;
	myLibrary[id].readPages = +e.target.value;
	pagesRead += +e.target.value;
	updateStatsDisplay();
}

const readToggle = (e) => {
	var id = e.target.id.substring(8);
	var book = myLibrary[id];
	if (e.target.checked) {
		
		pagesRead -= book.readPages;
		pagesRead += book.pages;
		book.readPages = book.pages;
		book.read = true;
		booksRead++;
		currentlyReading--;
	} else {
		book.readPages--;
		pagesRead--;
		book.read = false;
		book.read = false;
		currentlyReading++;
		booksRead--;
	}
	let slider = document.querySelector(`#read-pages-${id}`);
	slider.value = book.readPages;
	let queryid = `#page-display-${id}`;
	let label = document.querySelector(queryid);
	label.textContent = book.readPages;
	updateStatsDisplay();
}

const removeBook = (e) => {
	var id = e.target.id.substring(7);
	myLibrary.splice(id, 1);
	initDisplay();
}

const editBook = (e) => {
	var id = e.target.id.substring(5);
	var book = myLibrary[id];
}

const buildCard = (book, index) => {
	let colDiv = document.createElement('div');
	colDiv.classList.add('col-12','col-lg-3','col-md-6', 'd-flex');
	let cardDiv = document.createElement('div');
	cardDiv.classList.add('card','border','border-info','border-3','mx-auto','my-3','flex-fill');
	cardDiv['id'] = `book-${index}`;
	let bodyDiv = document.createElement('div');
	bodyDiv.classList.add('card-body');
	let div = document.createElement('div');
	let title = document.createElement('h4');
	title.classList.add('card-title');
	title.textContent = book.title;
	let author = document.createElement('h6');
	author.classList.add('card-subtitle','mb-2','text-muted');
	author.textContent = book.author;
	let div2 = document.createElement('div');
	div2.classList.add('mt-4');
	let label = document.createElement('label');
	label['for'] = 'readPages'
	label.classList.add('form-label','text-muted','m-0');
	label.textContent= 'Pages Read:';
	let sliderDiv = document.createElement('div');
	sliderDiv.classList.add('d-flex','justify-content-between');
	let slider = document.createElement('input');
	slider['type'] = 'range'
	slider.classList.add('form-range');
	slider['min'] = 0;
	slider['max'] = book.pages;
	slider.value = book.readPages;
	slider['id'] = `read-pages-${index}`;
	slider['aria-label'] = `${book.title} Pages Read`;
	slider.onchange = sliderChange;
	
	let readPages = document.createElement('span');
	readPages.classList.add('text-muted','ms-2');
	readPages.textContent = book.readPages;
	readPages['id'] = `page-display-${index}`;
	let readCk = document.createElement('input');
	readCk.classList.add('form-check-input');
	readCk['type'] = 'checkbox';
	readCk['id'] = `read-ck-${index}`;
	if (book.readPages == book.pages) {
		readCk.checked = true;
	} else {
		readCk.checked = false;
	}
	readCk.onchange = readToggle;
	let ckLabel = document.createElement('label');
	ckLabel.classList.add('form-check-label','ms-1');
	ckLabel['for'] = `read-ck-${index}`;
	ckLabel.textContent = 'Read';
	
	let footer = document.createElement('div');
	footer.classList.add('card-footer','d-flex','justify-content-end');
	let removeBtn = document.createElement('div');
	removeBtn.classList.add('btn','btn-outline-danger','btn-sm','px-2','mx-1');
	removeBtn.textContent = 'Remove';
	removeBtn['id'] = `remove-${index}`;
	removeBtn.onclick = removeBook;
	let editBtn = document.createElement('div');
	editBtn.classList.add('btn','btn-outline-success','btn-sm','px-4','mx-1');
	editBtn.textContent = 'Edit';
	editBtn['id'] = `edit-${index}`;
	editBtn.onclick = editBook;
	
	div.appendChild(title);
	div.appendChild(author);
	bodyDiv.appendChild(div);	
	sliderDiv.appendChild(slider);
	sliderDiv.appendChild(readPages);
	div2.appendChild(label);
	div2.appendChild(sliderDiv);
	div2.appendChild(readCk);
	div2.appendChild(ckLabel);
	bodyDiv.appendChild(div2);
	cardDiv.appendChild(bodyDiv);
	footer.appendChild(removeBtn);
	footer.appendChild(editBtn);
	cardDiv.appendChild(footer);
	colDiv.appendChild(cardDiv);
	
	cardsContainer.appendChild(colDiv);
}



window.addEventListener('DOMContentLoaded', () => {
	cardsContainer = document.querySelector('#cardsContainer');
	totalBooksSpan = document.querySelector('#totalBooks');
	currentlyReadingSpan = document.querySelector('#reading');
	booksReadSpan = document.querySelector('#booksRead');
	pagesReadSpan = document.querySelector('#pagesRead');
	bookForm = document.querySelector('#book-form');
	
	document.querySelector('#form-submit').addEventListener('click', addBook);
	initDisplay();
	updateStatsDisplay();
})
