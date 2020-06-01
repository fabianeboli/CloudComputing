import React, { useState, FC } from "react";
import { IonButton, IonCard, IonInput, IonButtons } from "@ionic/react";
import Header from "../../utils/Header";

type MouseEvent = React.MouseEvent<HTMLIonButtonElement, globalThis.MouseEvent>;

const SignUp: FC = () => {
	const [username, setUsername] = useState<string | null | undefined>("");
	const [password, setPassword] = useState<string | null | undefined>("");

	const handleForm = async (event: MouseEvent) => {
		event.preventDefault();
		// FIXME: Prawdziwe uwierzytelnienie po dodanym backendzie
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

		const response: Response = await fetch("http://localhost:3001/user", config);

		if (response.ok) {
			console.log("SIGNED UP NEW USER");
		} else {
			console.error(`ERROR: ${response.status}`);
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
						Zaloguj się
					</IonButton>
				</IonButtons>
			</form>
		</IonCard>
	);

	return (
		<div>
			<Header title="Rejestracja" />
			{/* TODO: LOGO */}
			{form}
		</div>
	);
};

export default SignUp;
