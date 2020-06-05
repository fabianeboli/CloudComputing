import React, { useState, FC } from "react";
import {
	IonButton,
	IonCard,
	IonInput,
	IonButtons,
	IonContent,
	IonGrid,
	IonRow,
	IonCol,
	IonSpinner,
} from "@ionic/react";
import Header from "../../utils/Header";
import { url } from "../../utils/url";

type MouseEvent = React.MouseEvent<HTMLIonButtonElement, globalThis.MouseEvent>;

const SignUp: FC = () => {
	const [username, setUsername] = useState<string | null | undefined>("");
	const [password, setPassword] = useState<string | null | undefined>("");
	const [error, setError] = useState<string>("");
	const [loader, setLoader] = useState<boolean>(false);

	const checkIfExist = async (username: string | null | undefined): Promise<boolean> => {
		const response = await fetch(`${url}/user`);

		if (response.ok) {
			const data = await response.json();
			const checkUsername = data.find((user: any) => user.username === username);
			console.log(checkUsername);
			if (!checkUsername) setError("Ten użytkownik już istnieje");
			console.log("TEST");
			return checkUsername !== undefined ? true : false;
		}
		return false;
	};

	const handleForm = async (event: MouseEvent): Promise<void> => {
		event.preventDefault();
		setLoader(true);
		setError("");

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

		// if (await checkIfExist(username)) {
			const response: Response = await fetch(`${url}/user`, config);

			if (response.ok) {
				console.log("SIGNED UP NEW USER");
				setLoader(false);
			} else {
				console.error(`ERROR: ${response.status}`);
				setError(`ERROR: ${response.statusText}`);
				setUsername("");
				setPassword("");
			}
		setLoader(false);
	};

	const form: JSX.Element = (
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
						onClick={(event) => handleForm(event)}
					>
						Zarejestruj się
					</IonButton>
				</IonButtons>
			</form>
		</IonCard>
	);

	const RegisterUser = (
		<IonGrid>
			<IonRow className="ion-align-items-center">
				<IonCol sizeSm="12" sizeMd="6" className="ion-justify-content-center">
					{form}
					<h2> {error} </h2>
				</IonCol>
			</IonRow>
		</IonGrid>
	);

	return (
		<IonContent>
			<Header title="Rejestracja" />
			{loader ? <IonSpinner name="crescent" color="primary" /> : RegisterUser}
		</IonContent>
	);
};

export default SignUp;
