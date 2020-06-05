import Menu from "./components/Menu";
import React, {  FC } from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {  Route, Switch, Redirect } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import About from "./components/About/About";
import { ThemeProvider } from "styled-components";
import { theme } from "./Theme.style";
import Books from "./components/Books/Books";
import Login from "./components/SignIn/SignIn";
import Register from "./components/SignUp/SignUp";
import { SignedProvider } from "./contexts/SignedContext";
import SignOut from "./components/SignOut/SignOut";
import UserLibrary from "./components/UserLibrary/UserLibrary";
import Contact from "./components/Contact/Contact";

const App: FC = () => {
	return (
		<SignedProvider>
			<IonApp>
				<ThemeProvider theme={theme}>
					<IonReactRouter>
						<IonSplitPane contentId="main">
							<Menu />
							<IonRouterOutlet id="main">
								<Switch>
									<Route path="/page/about" component={About} exact />
									<Route path="/page/books" component={Books} exact />
									<Route path="/page/contact" component={Contact} exact />
									<Route path="/page/signin" component={Login} exact />
									<Route path="/page/signup" component={Register} exact />
									<Route path="/page/signout" component={SignOut} exact />
									<Route path="/page/library" component={UserLibrary} exact />
									<Redirect from="/" to="/page/about" exact />
								</Switch>
							</IonRouterOutlet>
						</IonSplitPane>
					</IonReactRouter>
				</ThemeProvider>
			</IonApp>
		</SignedProvider>
	);
};

export default App;
