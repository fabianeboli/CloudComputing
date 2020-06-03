import React, { useContext, useEffect, FC } from "react";
import { SignedContext, Signed } from "../../contexts/SignedContext";
import { Redirect } from "react-router";
import { IonContent } from "@ionic/react";

const SignOut:FC = () => {
	const { signedIn, changeSignedIn }: Signed = useContext(SignedContext);

	useEffect(() => {
		changeSignedIn("","",[]);
	}, [changeSignedIn]);

	return (
		<IonContent>
			Trwa proces wylogowania...
			{!signedIn.username && <Redirect to="/page/about" />}
		</IonContent>
	);
};

export default SignOut;
