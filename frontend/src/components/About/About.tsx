import React, { FC } from "react";
import { IonContent } from "@ionic/react";
import * as S from "./About.style";
import Header from "../../utils/Header";

const About: FC = () => {
	return (
		<>
			<Header title="Strona Główna" />
			<IonContent>
				<S.h1>Biblioteka Libro</S.h1>
				<S.h2>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper
					purus in libero bibendum commodo. Nunc ac lorem efficitur, bibendum dolor sit
					amet, vulputate dui. In quis consectetur felis. Curabitur et leo dignissim,
					ornare enim id, ultricies erat. Nulla rhoncus nisl in fringilla elementum.
				</S.h2>
			</IonContent>
		</>
	);
};

export default About;
