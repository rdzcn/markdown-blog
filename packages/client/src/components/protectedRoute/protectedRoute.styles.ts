import { styled } from "@mui/material";

export const RouteWrapper = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    flex-direction: row;
  }
`;

export const ContentWrapper = styled("div")`
  padding: 24px;
  height: 100%;
  width: 100%;
`;
