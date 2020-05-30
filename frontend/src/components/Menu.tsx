import {
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonMenu,
	IonMenuToggle,
	IonNote,
} from "@ionic/react";

import React, { useContext } from "react";
import { useLocation, Route } from "react-router-dom";
import {
	bookmarkOutline,
	homeOutline,
	homeSharp,
	bookOutline,
	callOutline,
	callSharp,
	logInOutline,
	logOutOutline,
	personAddOutline,
  personRemoveOutline,
} from "ionicons/icons";
import "./Menu.css";
import { Signed, SignedContext } from "../contexts/SignedContext";
import {v4 as uuid} from 'uuid';

interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
}

const forSignedOutPages: AppPage[] = [
  {
		title: "Strona Główna",
		url: "/page/about ",
		iosIcon: homeOutline,
		mdIcon: homeSharp,
	},
	{
		title: "Ksiązki",
		url: "/page/books",
		iosIcon: bookOutline,
		mdIcon: bookOutline,
	},

	{
		title: "Kontakt",
		url: "/page/contact",
		iosIcon: callOutline,
		mdIcon: callSharp,
	},
	{
		title: "Zaloguj się",
		url: "/page/signin",
		iosIcon: logInOutline,
		mdIcon: logInOutline,
	},
	{
		title: "Zarejestruj się",
		url: "/page/signup",
		iosIcon: personAddOutline,
		mdIcon: personAddOutline,
	},
];

const forSignedInPages: AppPage[] = [
  {
		title: "Strona Główna",
		url: "/page/about ",
		iosIcon: homeOutline,
		mdIcon: homeSharp,
	},
	{
		title: "Ksiązki",
		url: "/page/books",
		iosIcon: bookOutline,
		mdIcon: bookOutline,
	},

	{
		title: "Kontakt",
		url: "/page/contact",
		iosIcon: callOutline,
		mdIcon: callSharp,
  },
  {
    title: "Twoje Książki",
    url: "/page/library",
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkOutline
  },
	{
		title: "Wyloguj się",
		url: "/page/signout",
		iosIcon: logOutOutline,
		mdIcon: logOutOutline,
	},
];


const Menu: React.FC = () => {
	const location = useLocation();
	const { signedIn }: Signed = useContext(SignedContext);
  
  const appPages = signedIn.username ? forSignedInPages : forSignedOutPages
  
	return (
		<IonMenu contentId="main" type="overlay">
			<IonContent>
				<IonList id="inbox-list">
        <IonListHeader>LIBRO</IonListHeader>
					<IonNote>{signedIn.username}</IonNote>
					{appPages.map((appPage) => {
						return (
							<IonMenuToggle key={uuid()} autoHide={false}>
								<IonItem
									className={location.pathname === appPage.url ? "selected" : ""}
									routerLink={appPage.url}
									routerDirection="none"
									lines="none"
									detail={false}
								>
									<IonIcon slot="start" icon={appPage.iosIcon} />
									<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					})}
				</IonList>

			</IonContent>
		</IonMenu>
	);
};

export default Menu;
