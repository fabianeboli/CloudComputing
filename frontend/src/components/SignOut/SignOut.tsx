import React, { useContext, useEffect, FC } from "react";
import { SignedContext, Signed, SignedProvider } from "../../contexts/SignedContext";
import { cleanup } from "@testing-library/react";
import { Redirect } from "react-router";
import { IonContent } from "@ionic/react";

const SignOut:FC = () => {
	const { signedIn, changeSignedIn }: Signed = useContext(SignedContext);

	useEffect(() => {
		changeSignedIn("","",[]);
	}, []);

	return (
		<IonContent>
			Trwa proces wylogowania...
			{!signedIn.username && <Redirect to="/page/about" />}
		</IonContent>
	);
};

export default SignOut;
