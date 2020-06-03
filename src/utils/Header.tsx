import React, { useState } from "react";
import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonTitle,
	IonToggle,
} from "@ionic/react";

interface Props {
	title: string;
}

const Header = (props: Props) => {
	const [toggle, setToggle] = useState<boolean>(true);

	const toggleTheme = () => {
		setToggle(!toggle);

		if (toggle) {
			document.body.classList.add("light");
			document.body.classList.remove("dark");
		} else {
			document.body.classList.add("dark");
			document.body.classList.remove("light");
		}
	};

	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{props.title}</IonTitle>
					<IonToggle onClick={toggleTheme} slot="end"></IonToggle>
				</IonToolbar>
			</IonHeader>
		</>
	);
};

export default Header;
