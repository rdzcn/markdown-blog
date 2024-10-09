import { Txt } from "@contexts/texts.context";
import { Avatar, Button } from "@mui/material";
import type { User } from "@@types/index";
import { useNavigate } from "react-router-dom";
import {
	SidebarContainer,
	UserActions,
	UserInfo,
	UserText,
} from "./sidebar.styles";

interface SidebarProps {
	companyName: string;
	currentUser: User;
}

const Sidebar = ({ companyName, currentUser }: SidebarProps) => {
	const navigate = useNavigate();
	return (
		<SidebarContainer>
			<Txt
				color="white"
				txtKey={companyName}
				variant="h4"
				fontWeight={"bold"}
			/>
			<UserActions>
				<UserInfo>
					<UserText>
						<Txt color="white" txtKey={currentUser?.name} />
						{/* <Txt color="white" txtKey={currentUser?.email} /> */}
					</UserText>
					<Avatar
						src={currentUser.profileImage}
						alt="profile image"
						sx={{ width: 64, height: 64 }}
					/>
				</UserInfo>
				<Button variant="outlined" onClick={() => navigate("/logout")}>
					<Txt color="white" txtKey="logout" />
				</Button>
			</UserActions>
		</SidebarContainer>
	);
};

export default Sidebar;
