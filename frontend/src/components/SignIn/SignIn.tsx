import React, { useState, useContext } from "react";
import { IonButton } from "@ionic/react";
import { SignedContext, Signed } from "../../contexts/SignedContext";

type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

type User = {
	username: string;
	password: string;
};

const SignIn = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { signedIn, changeSignedIn }: Signed = useContext(SignedContext);
	const handleForm = async (event: MouseEvent) => {
		event.preventDefault();

		// const config = {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json;charset=utf-8" },
		// 	body: JSON.stringify(user),
		// };

		const response: Response = await fetch("http://localhost:3001/user");

		if (response.ok) {
			// FIXME: Zmienić bo dodaniu backendu
			const users = await response.json();
			const findUser = users.find(
				(user: User) => user.username === username && user.password === password,
			);
			findUser && console.log("LOGGED IN");
			if(findUser) changeSignedIn(username);
		} else {
			console.error(`ERROR: ${response.status}`);
		}
	};

	const Form: JSX.Element = (
		<>
			<form>
				<input
					type="text"
					name="name"
					placeholder="Imie"
					value={username}
					onChange={({ target }) => setUsername(target.value)}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Hasło"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
					required
				/>
				<button type="submit" onClick={(event) => handleForm(event)}>
					Zaloguj się
				</button>
			</form>
		</>
	);

	return (
		<div>
			{/* TODO: LOGO */}
			{!signedIn && Form }
			
		</div>
	);
};

export default SignIn;
