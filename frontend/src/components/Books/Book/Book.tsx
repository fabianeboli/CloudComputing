import React, { FC, useContext, useState } from "react";
import * as S from "./Book.style";
import moment from "moment";
import {
	IonCardSubtitle,
	IonCardTitle,
	IonCard,
	IonIcon,
	IonContent,
	IonButton,
	IonCardContent,
} from "@ionic/react";
import { SignedContext, Signed } from "../../../contexts/SignedContext";
import { url } from "../../../utils/url";

export interface Book {
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

const Book: FC<Book> = (props: Book) => {
	const [stock, setStock] = useState<number>(props.stock);
	const { signedIn }: Signed = useContext(SignedContext);
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
		// FIXME: Błąd usuwanie książek
		const orderBook: Response = await fetch(
			`${url}/user/${signedIn.id}`,
			config,
		);

		if (orderBook.ok) {
			await setStock((stock: number) => stock - 1);

			const bookConfig = {
				method: "PATCH",
				headers: { "Content-Type": "application/json;charset=utf-8" },
				body: JSON.stringify({ stock }),
			};

			// FIXME: zmienić po dodaniu backendu
			const updateStock: Response = await fetch(
				`${url}/book/${props.id}`,
				bookConfig,
			);
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
				<IonButton onClick={(event) => handleClick(event)}>Wypożycz</IonButton>
			) : (
				<IonButton disabled> Zaloguj się, aby wypożyczyć</IonButton>
			)}
		</>
	);

	const OutOfStock: JSX.Element = (
		<>
			<IonCardSubtitle color="danger">Brak dostępu!</IonCardSubtitle>
			<IonButton disabled>Wypożycz</IonButton>
		</>
	);

	return (
		<IonCard>
			<IonIcon src={props.cover} />
			<IonCardSubtitle>{props.author}</IonCardSubtitle>
			<IonCardSubtitle>{props.category}</IonCardSubtitle>
			<IonCardTitle>{props.title}</IonCardTitle>
			<IonCardSubtitle color="light">
				{props.publisher} {props.year}{" "}
			</IonCardSubtitle>
			<IonCardContent>{props.description}</IonCardContent>
			{stock ? InStock : OutOfStock}
		</IonCard>
	);
};

export default Book;
