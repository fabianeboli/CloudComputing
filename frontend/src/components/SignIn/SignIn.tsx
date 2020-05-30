import React, { useState, useContext, FC } from "react";
import { IonButton } from "@ionic/react";
import { SignedContext, Signed } from "../../contexts/SignedContext";
import * as S from "./SignIn.style";

type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

type User = {
	username: string;
	password: string;
};

const SignIn: FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
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
			<form>
				<input
					type="text"
					name="name"
					placeholder="Imie"
					value={username}
					onChange={({ target }) => setUsername(target.value.trim())}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Hasło"
					value={password}
					onChange={({ target }) => setPassword(target.value.trim())}
					required
				/>
				<button type="submit" onClick={(event) => handleForm(event)}>
					Zaloguj się
				</button>
			</form>
		</>
	);

	const SignedInGreeting: JSX.Element = (
		<>
			<h1>Witaj {signedIn.username}!</h1>
		</>
	);

	return (
		<S.container>
			{signedIn.username ? SignedInGreeting : SignInForm}
			{error && <h1>Błąd: {error}</h1>}
		</S.container>
	);
};

export default SignIn;
