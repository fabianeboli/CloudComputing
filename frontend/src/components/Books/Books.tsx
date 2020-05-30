import React, { FC, useState, useEffect } from "react";
import Book, { Book as IBook } from "./Book/Book";
import { IonTitle } from "@ionic/react";
import { v4 as uuid } from "uuid";
const Books: FC = () => {
	const [books, setBooks] = useState<IBook[]>([]);

	const getBooks = async () => {
		const response = await fetch("http://localhost:3001/book");

		if (response.ok) {
			const fetchedData = await response.json();
			setBooks(fetchedData);
		} else {
			console.error(`ERROR: ${response.status}`);
		}
	};

	useEffect(() => {
		getBooks();
	}, []);

	const presentBooks = (books: IBook[]) => {
		return books.map((book) => (
			<Book
				key={uuid()}
				id={book.id}
				title={book.title}
				author={book.author}
				cover={book.cover}
				category={book.category}
				publisher={book.publisher}
				year={book.year}
				description={book.description}
				stock={book.stock}
			/>
		));
	};

	return (
		<div>
			<IonTitle color="white">Książki</IonTitle>
			{presentBooks(books)}
		</div>
	);
};

export default Books;
