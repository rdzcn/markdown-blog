import {
  ErrorResponse,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";
import { Txt } from "@contexts/texts.context";
import { ErrorContainer } from "./errorBoundary.styles";
import { Box } from "@mui/material";

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
