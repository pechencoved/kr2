import { uuid } from "../utils/uuid.js";

export default class Model {
	#observables = [];
	#books = [
		{
			id: uuid(),
			title: "Мы",
			author: "Евгений Замятин",
			year: 1924,
			genre: "SCIENCE",
			status: "AVAILABLE",
		},
		{
			id: uuid(),
			title: "TypeScript быстро",
			author: "Антон Моисеев",
			year: 2021,
			genre: "PROGRAMMING",
			status: "AVAILABLE",
		},
	];

	getBooks(filters) {
		return this.#books.filter((book) => {
			const genreMatch = !filters.genre || book.genre === filters.genre;
			const searchMatch =
				!filters.search ||
				book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
				book.author.toLowerCase().includes(filters.search.toLowerCase());

			return genreMatch && searchMatch;
		});
	}

	addBook(book) {
		this.#books.push({
			id: uuid(),
			...book,
		});

		this.#notify();
	}

	removeBook(bookId) {
		this.#books = this.#books.filter((book) => book.id !== bookId);
		this.#notify();
	}

	subscribe(cb) {
		this.#observables.push(cb);
	}

	#notify() {
		this.#observables.forEach((cb) => cb());
	}
}
