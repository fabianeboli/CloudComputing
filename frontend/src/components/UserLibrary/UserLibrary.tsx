import React, { useContext, FC } from "react";
import { SignedContext } from "../../contexts/SignedContext";
import {
	IonCardSubtitle,
	IonContent,
	IonGrid,
	IonRow,
	IonCol,
} from "@ionic/react";
import { IBook } from "../Books/Book/Book";
import Header from "../../utils/Header";
import { v4 as uuid } from "uuid";
import {
	StyledIonImage,
	StyledIonCard,
	StyledIonCardTitle,
	StyledIonCardSubTitle,
} from "../Books/Book/Book.style";

const UserLibrary: FC = () => {
	const { signedIn } = useContext(SignedContext);

	const presentBooks = (books: IBook[] & any) =>
		books.map((book: any) => (
			<>
				<IonCol sizeSm="12" sizeMd="6" className="ion-justify-content-center">
					<StyledIonCard key={uuid()}>
						<StyledIonCardTitle>{book.title}</StyledIonCardTitle>
						<StyledIonImage src={book.cover} />
						<StyledIonCardSubTitle>
							{book.author} {book.category}
						</StyledIonCardSubTitle>
						<IonCardSubtitle color="danger">
							DO ODDANIA: {book.rentDate}
						</IonCardSubtitle>
					</StyledIonCard>
				</IonCol>
			</>
		));

	return (
		<IonContent>
			<Header title="Twoje zamówione ksiązki" />
			<IonGrid fixed>
				<IonRow className="ion-align-items-center">{presentBooks(signedIn.books)}</IonRow>
			</IonGrid>
		</IonContent>
	);
};

export default UserLibrary;
