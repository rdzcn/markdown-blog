import { Txt } from "@contexts/texts.context";
import { Box } from "@mui/material";
import {
	type ErrorResponse,
	isRouteErrorResponse,
	useRouteError,
} from "react-router-dom";
import { ErrorContainer } from "./errorBoundary.styles";

export default function RootBoundary() {
	const error = useRouteError() as ErrorResponse;

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return (
				<ErrorContainer>
					<Txt txtKey="error.404" mx={"auto"} variant="h4" />
				</ErrorContainer>
			);
		}

		if (error.status === 401) {
			return (
				<ErrorContainer>
					<Txt txtKey="error.401" mx={"auto"} variant="h4" />
				</ErrorContainer>
			);
		}

		if (error.status === 503) {
			return (
				<ErrorContainer>
					<Txt txtKey="error.503" mx={"auto"} variant="h4" />
				</ErrorContainer>
			);
		}
	}

	return (
		<ErrorContainer>
			<Txt txtKey="error.default" mx={"auto"} variant="h4" />
		</ErrorContainer>
	);
}
