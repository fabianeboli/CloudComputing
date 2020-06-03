import React, { useState, FC } from "react";
import { IonButton, IonCard, IonInput, IonButtons, IonContent } from "@ionic/react";
import Header from "../../utils/Header";
import { url } from "../../utils/url";

type MouseEvent = React.MouseEvent<HTMLIonButtonElement, globalThis.MouseEvent>;

const SignUp: FC = () => {
	const [username, setUsername] = useState<string | null | undefined>("");
	const [password, setPassword] = useState<string | null | undefined>("");
	const [error, setError] = useState<string>("");

	const checkIfExist = async (username: string | null | undefined): Promise<boolean> => {
		const response = await fetch(`${url}/user`);

		if (response.ok) {
			const data = await response.json();
			const checkUsername = data.find((user: any) => user.username === username);
			!checkUsername && setError("Ten użytkownik już istnieje");
			return checkUsername ? true : false;
		}
		return false;
	};

	const handleForm = async (event: MouseEvent): Promise<void> => {
		event.preventDefault();
		setError("");

		if (checkIfExist(username)) return;

		const user = {
			username,
			password,
			books: [],
		};

		const config = {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify(user),
		};

		const response: Response = await fetch(`${url}/user`, config);

		if (response.ok) {
			console.log("SIGNED UP NEW USER");
		} else {
			console.error(`ERROR: ${response.status}`);
			setError(`ERROR: ${response.statusText}`);
		}
	};

	const form = (
		<IonCard>
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
						Zarejestruj się
					</IonButton>
				</IonButtons>
			</form>
		</IonCard>
	);

	return (
		<IonContent>
			<Header title="Rejestracja" />
			{/* TODO: LOGO */}
			{form}
			<h2> {error} </h2>
		</IonContent>
	);
};

export default SignUp;
