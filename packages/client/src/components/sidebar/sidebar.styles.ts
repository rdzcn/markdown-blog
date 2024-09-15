import LoginBanner from "@assets/loginBackground.jpg";
import { styled } from "@mui/material";

export const SidebarContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: no-repeat url(${LoginBanner});
  background-size: cover;
  background-position: center;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey[900]};
  padding: 24px 24px 48px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: 360px;
  }
`;

export const UserActions = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
`;

export const UserInfo = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserText = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
