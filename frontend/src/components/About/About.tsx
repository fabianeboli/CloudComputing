import React, { FC } from "react";
import { IonContent, IonCard } from "@ionic/react";
import * as S from "./About.style";
import Header from "../../utils/Header";

const About: FC = () => {
	return (
		<>
			<Header title="Strona Główna" />
			<IonContent>
				<IonCard className="ion-align-items-center">
					<S.h1>Biblioteka Libro</S.h1>
					<h2>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper
						purus in libero bibendum commodo. Nunc ac lorem efficitur, bibendum dolor
						sit amet, vulputate dui. In quis consectetur felis. Curabitur et leo
						dignissim, ornare enim id, ultricies erat. Nulla rhoncus nisl in fringilla
						elementum.
					</h2>
				</IonCard>
			</IonContent>
		</>
	);
};

export default About;
