import React, { useState, useContext, FC } from "react";
import { IonButton, IonInput, IonButtons, IonCard, IonContent } from "@ionic/react";
import { SignedContext, Signed } from "../../contexts/SignedContext";
import * as S from "./SignIn.style";
import Header from "../../utils/Header";

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

	const handleForm = async (event: MouseEvent): Promise<void> => {
		event.preventDefault();

		const response: Response = await fetch("http://localhost:3001/user");

		if (response.ok) {
			// FIXME: Zmienić bo dodaniu backendu
			const users = await response.json();
			const foundUser = users.find(
				(user: User) => user.username === username && user.password === password,
			);
			console.log("I AM HERE", foundUser);
			if (foundUser) changeSignedIn(foundUser.id, foundUser.username, foundUser.books);
			foundUser && console.log("LOGGED IN ", signedIn.username);
		} else {
			console.error(`ERROR: ${response.status}`);
			setError(error);
		}
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

	return (
		<IonContent>
			<Header title="Zaloguj się" />
			<IonCard>
				{signedIn.username ? SignedInGreeting : SignInForm}
				{error && <h1>Błąd: {error}</h1>}
			</IonCard>
		</IonContent>
	);
};

export default SignIn;
