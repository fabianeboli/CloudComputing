import styled from "styled-components";

export const container = styled.div`
	display: flex;
	background-color: ${(p) => p.theme.background} !important;
	color: ${(p) => p.theme.foreground};
`;
