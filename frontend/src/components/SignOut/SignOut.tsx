import React, { useContext, useEffect, FC } from "react";
import { SignedContext, Signed, SignedProvider } from "../../contexts/SignedContext";
import { cleanup } from "@testing-library/react";
import { Redirect } from "react-router";

const SignOut:FC = () => {
	const { signedIn, changeSignedIn }: Signed = useContext(SignedContext);

	useEffect(() => {
		changeSignedIn("","",[]);
	}, []);

	return (
		<div>
			Trwa proces wylogowania...
			{!signedIn.username && <Redirect to="/" />}
		</div>
	);
};

export default SignOut;
