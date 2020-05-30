import React from "react";
import {
	IonPage,
	IonHeader,
	IonTitle,
	IonButton,
	IonToolbar,
	IonButtons,
	IonMenuButton,
} from "@ionic/react";
import * as S from "./About.style";

const About = () => {
	return (
		<S.IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Strona Główna</IonTitle>
				</IonToolbar>
			</IonHeader>
			<S.container>
				<S.h1>Biblioteka Libro</S.h1>
				<S.h2>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper
					purus in libero bibendum commodo. Nunc ac lorem efficitur, bibendum dolor sit
					amet, vulputate dui. In quis consectetur felis. Curabitur et leo dignissim,
					ornare enim id, ultricies erat. Nulla rhoncus nisl in fringilla elementum.
				</S.h2>

				<IonButton> Zarezerwuj </IonButton>
			</S.container>
		</S.IonPage>
	);
};

export default About;
