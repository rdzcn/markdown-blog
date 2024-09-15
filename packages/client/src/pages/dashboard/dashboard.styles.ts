import { Txt } from "@contexts/texts.context";
import { styled } from "@mui/material";

export const DashboardWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TransactionDetailsContainer = styled("div")`
  width: 100%;
  padding: 96px 24px 0;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: 30vw;
  }
`;

export const TitleWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
`;

export const DetailsWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0px 0px 2px 2px ${({ theme }) => theme.palette.grey[300]};
  padding: 24px;
`;

export const Row = styled("div")`
  display: grid;
  grid-template-columns: 1fr 2fr;
  row-gap: 24px;
  height: 48px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    grid-template-columns: 1fr 7fr;
  }
`;

export const Item = styled(Txt)`
  &:after {
    content: ":";
  }
`;

export const Value = styled(Txt)``;

export const CloseIcon = styled(Txt)`
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.palette.common.black};
`;

export const FilterWrapper = styled("div")`
  position: relative;
`;

export const FilterContainer = styled("div")`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
