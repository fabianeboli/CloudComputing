import React, { useState, useContext, FC } from "react";
import {
	IonButton,
	IonInput,
	IonButtons,
	IonCard,
	IonContent,
	IonRow,
	IonCol,
	IonSpinner,
} from "@ionic/react";
import { SignedContext, Signed } from "../../contexts/SignedContext";
import Header from "../../utils/Header";
import { url } from "../../utils/url";

type MouseEvent = React.MouseEvent<HTMLIonButtonElement, globalThis.MouseEvent>;

type User = {
	username: string;
	password: string;
};

const SignIn: FC = () => {
	const [username, setUsername] = useState<string | null | undefined>("");
	const [password, setPassword] = useState<string | null | undefined>("");
	const { signedIn, changeSignedIn }: Signed = useContext(SignedContext);
	const [error, setError] = useState<string>("");
	const [loader, setLoader] = useState<boolean>(false);

	const handleForm = async (event: MouseEvent): Promise<void> => {
		event.preventDefault();
		setLoader(true);
		setError("");

		const response: Response = await fetch(`${url}/user`);

		if (response.ok) {
			const users = await response.json();
			const foundUser = users.find(
				(user: User) => user.username === username && user.password === password,
			);
			if (foundUser) {
				changeSignedIn(foundUser.id, foundUser.username, foundUser.books);
			} else {
				setError(`Użytkownik nie istnieje`);
			}
		} else {
			console.error(`ERROR: ${response.status}`);
			setError(`ERROR: ${response.statusText}`);
			setUsername("");
			setPassword("");
		}
		setLoader(false);
	};

	const SignInForm: JSX.Element = (
		<>
			<form onSubmit={(e) => e.preventDefault()}>
				<IonInput
					type="text"
					name="name"
					placeholder="Imie"
					value={username}
					onIonChange={(event) => setUsername(event.detail.value)}
					required
				/>
				<IonInput
					type="password"
					name="password"
					placeholder="Hasło"
					value={password}
					onIonChange={(event) => setPassword(event.detail.value)}
					required
				/>
				<IonButtons>
					<IonButton
						type="submit"
						slot="primary"
						expand={"full"}
						onClick={(event: any) => handleForm(event)}
					>
						Zaloguj się
					</IonButton>
				</IonButtons>
			</form>
		</>
	);

	const SignedInGreeting: JSX.Element = (
		<>
			<h1>Witaj {signedIn.username}!</h1>
		</>
	);

	const SignUser = (
		<IonRow className="ion-align-items-center">
			<IonCol sizeSm="12" sizeMd="6" className="ion-justify-content-center">
				<IonCard>{signedIn.username ? SignedInGreeting : SignInForm}</IonCard>
				<h1> {error}</h1>
			</IonCol>
		</IonRow>
	);

	return (
		<IonContent>
			<Header title="Zaloguj się" />
			{loader ? (
				<IonSpinner name="crescent" color="primary" />
			) : (
				<IonRow className="ion-align-items-center">
					<IonCol sizeSm="12" sizeMd="6" className="ion-justify-content-center">
						<IonCard>{signedIn.username ? SignedInGreeting : SignInForm}</IonCard>
						<h1> {error}</h1>
					</IonCol>
				</IonRow>
			)}
		</IonContent>
	);
};

export default SignIn;
