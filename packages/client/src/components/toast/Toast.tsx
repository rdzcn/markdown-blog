import { Txt } from "@contexts/texts.context";
import { useEffect, useState } from "react";
import { NotificationStyles } from "./toast.styles";

interface IProps {
	txtKey: string;
	setToast: (value: null) => void;
}

const NotificationContainer = ({ txtKey, setToast }: IProps) => {
	const [visibility, setVisibility] = useState(false);

	useEffect(() => {
		setVisibility(true);
		setTimeout(() => setToast(null), 5000);

		return () => setVisibility(false);
	}, []);

	return (
		<>
			{visibility ? (
				<NotificationStyles data-testid="toast-container">
					<Txt txtKey={txtKey} variant="h5" color={"white"} />
				</NotificationStyles>
			) : null}
		</>
	);
};

export default NotificationContainer;
