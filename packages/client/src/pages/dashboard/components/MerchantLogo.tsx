import { styled } from "@mui/material";

const MerchantLogoImage = styled("img")`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

interface MerchantLogoProps {
	iconUrl: string;
	name: string;
}

const MerchantLogo = ({ iconUrl, name }: MerchantLogoProps) => {
	return <MerchantLogoImage src={iconUrl} alt={name} />;
};

export default MerchantLogo;
