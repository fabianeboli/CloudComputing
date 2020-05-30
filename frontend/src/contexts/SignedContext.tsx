import React, { createContext, Context, useState, FC } from "react";

interface Props {
	children: React.ReactNode;
}

export interface Signed {
	signedIn: string;
	changeSignedIn: (signed: string) => void;
}

export const SignedContext: Context<Signed> = createContext<Signed>({
	signedIn: "",
	changeSignedIn: () => {},
});

export const SignedProvider: FC<Props> = (props: Props) => {
	const [signedIn, setSigned] = useState<string>("");
	const changeSignedIn = (username: string) => setSigned(username);
	return (
		<SignedContext.Provider value={{ signedIn, changeSignedIn }}>
			{props.children}
		</SignedContext.Provider>
	);
};


