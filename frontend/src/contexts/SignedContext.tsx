import React, { createContext, Context, useState, FC } from "react";
import { Book } from "../components/Books/Book/Book";
import useLocalStorage from "../hooks/useLocalStorage";

interface Props {
	children: React.ReactNode;
}

type IdUserName = {
	id: string;
	username: string;
	books: Book[] | any[];
};

export interface Signed {
	signedIn: IdUserName;
	changeSignedIn: (id: string, signed: string, books: string[]) => void;
}

export const SignedContext: Context<Signed> = createContext<Signed>({
	signedIn: {
		id: "",
		username: "",
		books: [],
	},
	changeSignedIn: () => {},
});

export const SignedProvider: FC<Props> = (props: Props) => {
	const [signedIn, setSigned] = useLocalStorage("login",{ id: "", username: "", books: [] });
	const changeSignedIn = (id: string, username: string, books: string[]) =>
		setSigned({ id, username, books });
	return (
		<SignedContext.Provider value={{ signedIn, changeSignedIn }}>
			{props.children}
		</SignedContext.Provider>
	);
};
