import React, { useState } from "react";
import { IonButton } from "@ionic/react";

type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

const SignUp = () => {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleForm = async (event: MouseEvent) => {
		event.preventDefault();
		// TODO: Prawdziwe uwierzytelnienie po dodanym backendzie
		const id: number = Math.floor(Math.random() * 100000);
		const user = {
			login,
			password,
		};

		const config = {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify(user),
		};

		const response: Response = await fetch("http://localhost:3001/user", config);

		if (response.ok) {
			console.log("SIGNED UP NEW USER");
		} else {
			console.error(`ERROR: ${response.status}`);
		}
	};

	const form = (
		<>
			<form>
				<input
					type="text"
					name="name"
					placeholder="Imię"
					value={login}
					onChange={({ target }) => setLogin(target.value)}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Hasło"
					value={password}
					min="3"
					onChange={({ target }) => setPassword(target.value)}
					required
				/>
				<button type="submit" onClick={(event) => handleForm(event)}>
					Zarejestruj się
				</button>
			</form>
		</>
	);

	return <div>{/* TODO: LOGO */}{form}</div>;
};

export default SignUp;
