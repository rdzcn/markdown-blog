import { styled, Button } from "@mui/material";
import LoginBanner from "@assets/loginBackground.jpg";

export const AuthorizationWrapper = styled("div")`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const CommercialContentWrapper = styled("div")`
  display: none;
  background: no-repeat url(${LoginBanner});
  background-size: cover;
  background-position: center;
  position: relative;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    display: block;
  }
`;

export const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  justify-content: center;
  margin: 0 auto;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: 50%;
  }
`;

export const LoginContent = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  margin-top: 16px;
  border-radius: 16px;
`;
