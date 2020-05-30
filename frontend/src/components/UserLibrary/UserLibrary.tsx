import React, { useContext, FC } from "react";
import { SignedContext } from "../../contexts/SignedContext";
import { IonHeader, IonCardTitle, IonCard, IonCardSubtitle, IonImg } from "@ionic/react";
import { Book } from "../Books/Book/Book";




const UserLibrary: FC = () => {
	const { signedIn } = useContext(SignedContext);

	const presentBooks = (books: Book[] & any) =>
		books.map((book: any) => (
			<>
				<IonCard>
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
		<div>
			<IonHeader>Twoje zamówione książki</IonHeader>
			{presentBooks(signedIn.books)}
		</div>
	);
};

export default UserLibrary;
