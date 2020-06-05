import React, { FC, useState, useEffect } from "react";
import { Book, IBook } from "./Book/Book";
import { IonContent, IonGrid, IonRow, IonSpinner } from "@ionic/react";
import { v4 as uuid } from "uuid";
import Header from "../../utils/Header";
import { url } from "../../utils/url";

const Books: FC = () => {
	const [books, setBooks] = useState<IBook[]>([]);
	const [loader, setLoader] = useState<boolean>(false);

	const getBooks = async () => {
		setLoader(true);
		const response = await fetch(`${url}/book`);

		if (response.ok) {
			const fetchedData = await response.json();
			setBooks(fetchedData);
		} else {
			console.error(`ERROR: ${response.status}`);
		}
		setLoader(false);
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
		<IonContent>
			<Header title="Książki" />
			<IonGrid fixed>
				<IonRow className="ion-align-items-center">
					{loader ? <IonSpinner name="crescent" color="primary" /> : presentBooks(books)}
				</IonRow>
			</IonGrid>
		</IonContent>
	);
};

export default Books;
