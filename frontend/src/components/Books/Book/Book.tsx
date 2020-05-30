import React, { FC } from "react";
import * as S from "./Book.style";
import {
	IonCardSubtitle,
	IonCardTitle,
	IonCard,
	IonIcon,
	IonContent,
} from "@ionic/react";

export interface Book {
	title: string;
	author: string;
	cover: string;
	description: string;
	publisher: string;
	year: string;
	stock: number;
}

const Book: FC<Book> = (props: Book) => {
	return (
		<IonCard>
			<IonIcon src={props.cover} />
			<IonCardSubtitle>{props.author}</IonCardSubtitle>
			<IonCardTitle>{props.title}</IonCardTitle>
			<IonCardSubtitle color="light">
				{props.publisher} {props.year}{" "}
			</IonCardSubtitle>
			<IonContent>{props.description}</IonContent>
		</IonCard>
	);
};

export default Book;
