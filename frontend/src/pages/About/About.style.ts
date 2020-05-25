import { IonPage as Page, IonTitle as Title } from "@ionic/react";
import styled from "styled-components";

export const container = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: auto;
`

export const h1 = styled.h1`
  color: ${(p) => p.theme.accent};
  text-align: center;
  font-size: calc(2.0em + 1.1vw);
`;

export const h2 = styled.h2`
  color: ${(p) => p.theme.foreground};
  text-align: center;
  margin: 1% 0;
`;

export const IonPage = styled(Page)`
  background-color: ${(p) => p.theme.background};
`;

export const IonTitle = styled(Title)`
  color: ${(p) => p.theme.accent};
`;
