import React from "react";
import { IonContent, IonGrid } from "@ionic/react";
import Header from "../../utils/Header";

const Contact = () => {
	return (
		<IonContent>
			<Header title="Kontakt" />
			<IonGrid>
				<h1>
					Telefon: <a href="tel:+612251213"> 612 251 213</a>
				</h1>
				<h1>
					Email: <a href="mailto:libro@libro.pl"> libro@libro.pl</a>
				</h1>
			</IonGrid>
		</IonContent>
	);
};

export default Contact;
