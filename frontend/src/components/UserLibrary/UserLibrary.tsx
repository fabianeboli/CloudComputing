import React, { useContext, FC } from "react";
import { SignedContext } from "../../contexts/SignedContext";
import {
	IonHeader,
	IonCardTitle,
	IonCard,
	IonCardSubtitle,
	IonImg,
	IonContent,
} from "@ionic/react";
import { Book } from "../Books/Book/Book";
import Header from "../../utils/Header";
import { v4 as uuid } from "uuid";

const UserLibrary: FC = () => {
	const { signedIn } = useContext(SignedContext);

	const presentBooks = (books: Book[] & any) =>
		books.map((book: any) => (
			<>
				<IonCard key={uuid()}>
					<IonCardTitle>{book.title}</IonCardTitle>
					<IonImg> {book.cover} </IonImg>
					<IonCardSubtitle>
						{book.author} {book.category}
					</IonCardSubtitle>
					<IonCardSubtitle>DO ODDANIA: {book.rentDate}</IonCardSubtitle>
				</IonCard>
			</>
		));

	return (
		<IonContent>
			<Header title="Twoje zamówione ksiązki" />
			{presentBooks(signedIn.books)}
		</IonContent>
	);
};

export default UserLibrary;
