import React, { FC, useContext, useState } from "react";
import moment from "moment";
import {
	IonCardSubtitle,
	IonCardTitle,
	IonCard,
	IonIcon,
	IonButton,
	IonCardContent,
	IonImg,
	IonThumbnail,
	IonRow,
	IonCol,
	IonCardHeader,
	IonTitle,
} from "@ionic/react";
import { SignedContext, Signed } from "../../../contexts/SignedContext";
import { url } from "../../../utils/url";
import {
	StyledIonImage,
	StyledIonCardTitle,
	StyledIonCard,
	StyledIonCardContent,
	StyledIonButton,
} from "./Book.style";

export interface IBook {
	id: string;
	title: string;
	author: string;
	cover: string;
	category: string;
	description: string;
	publisher: string;
	year: string;
	stock: number;
}

type MouseEvent = React.MouseEvent<HTMLIonButtonElement, globalThis.MouseEvent>;

export const Book: FC<IBook> = (props: IBook) => {
	const [stock, setStock] = useState<number>(props.stock);
	const { signedIn, changeSignedIn }: Signed = useContext(SignedContext);
	const handleClick = async (event: MouseEvent) => {
		event.preventDefault();

		const newBook = {
			...props,
			rentDate: moment().add(30, "days").format("ll"),
		};
		const getUserData: Response = await fetch(`${url}/user/${signedIn.id}`);
		const userData = await getUserData.json();

		const config = {
			method: "PATCH",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({ books: [...userData.books, newBook] }),
		};
		// Find user by id Append ordered books
		const orderBook: Response = await fetch(`${url}/user/${signedIn.id}`, config);

		if (orderBook.ok) {
			setStock(stock - 1);
			changeSignedIn(signedIn.id, signedIn.username, [...signedIn.books, newBook]);

			const bookConfig = {
				method: "PATCH",
				headers: { "Content-Type": "application/json;charset=utf-8" },
				body: JSON.stringify({ stock: stock - 1 }),
			};
			// decrease stock in the library
			const updateStock: Response = await fetch(`${url}/book/${props.id}`, bookConfig);
			if (updateStock.ok) {
				console.log("UPDATED STOCK");
			} else {
				console.error(`ERROR ${updateStock.status}`);
			}
		} else {
			console.error(`ERROR: ${orderBook.status}`);
		}
	};

	const InStock: JSX.Element = (
		<>
			<IonCardSubtitle>Ilość w magazynie: {stock}</IonCardSubtitle>
			{signedIn.username ? (
				<StyledIonButton expand="block" onClick={(event) => handleClick(event)}>
					Wypożycz
				</StyledIonButton>
			) : (
				<StyledIonButton expand="block" disabled>
					{" "}
					Zaloguj się, aby wypożyczyć
				</StyledIonButton>
			)}
		</>
	);

	const OutOfStock: JSX.Element = (
		<>
			<IonCardSubtitle color="danger">Brak dostępu!</IonCardSubtitle>
			<StyledIonButton expand="block" disabled>
				Wypożycz
			</StyledIonButton>
		</>
	);

	return (
		<IonCol sizeSm="12" sizeMd="6" className="ion-justify-content-center">
			<StyledIonCard>
				<StyledIonCardTitle>{props.title}</StyledIonCardTitle>

				<StyledIonImage src={props.cover} />

				<IonCardSubtitle>{props.author}</IonCardSubtitle>
				<IonCardSubtitle>{props.category}</IonCardSubtitle>
				<IonCardSubtitle>
					{props.publisher} {props.year}{" "}
				</IonCardSubtitle>
				<StyledIonCardContent>{props.description}</StyledIonCardContent>
				{stock ? InStock : OutOfStock}
			</StyledIonCard>
		</IonCol>
	);
};

export default Book;
