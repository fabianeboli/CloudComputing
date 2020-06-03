import styled from "styled-components";
import {
	IonThumbnail,
	IonImg,
	IonCardTitle,
	IonCardSubtitle,
	IonCard,
	IonCardContent,
	IonButton,
} from "@ionic/react";

export const container = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StyledIonCard = styled(IonCard)`
	text-align: center;
`;

export const StyledIonCardContent = styled(IonCardContent)`
	text-align: start;
`;

export const StyledIonCardTitle = styled(IonCardTitle)`
	text-align: center;
	padding: 15px;
`;
export const StyledIonCardSubTitle = styled(IonCardSubtitle)`
	text-align: center;
	padding: 15px;
`;

export const StyledIonThumbnail = styled(IonThumbnail)`
	width: 50%;
	margin: 0 auto;
	border-radius: 3px;
	height: 25em;
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
`;

export const StyledIonButton = styled(IonButton)`
	font-weight: 700;
	margin: 5%;
`;

export const StyledIonImage = styled(IonImg)`
	max-width: 50%;
	margin: 0 auto;
	border-radius: 3px;
	height: 25em;
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
`;
