import { useUsers } from "@components/protectedRoute/ProtectedRoute";
import { Txt } from "@contexts/texts.context";
import { Drawer, IconButton } from "@mui/material";
import { localizeValue, normalizeData } from "@shared/utils";
import type { Transaction } from "@types/index";
import { useMemo } from "react";
import {
	CloseIcon,
	DetailsWrapper,
	Item,
	Row,
	TitleWrapper,
	TransactionDetailsContainer,
	Value,
} from "../dashboard.styles";

interface TransactionDetailsProps {
	transaction: Transaction;
	isOpen: boolean;
	close: () => void;
}

const TransactionDetails = ({
	transaction,
	isOpen,
	close,
}: TransactionDetailsProps) => {
	const { users } = useUsers();
	const normalizedUsers = useMemo(() => normalizeData(users, "id"), [users]);

	return (
		<Drawer open={isOpen} onClose={close} anchor="right">
			<TransactionDetailsContainer>
				<TitleWrapper>
					<Txt txtKey="transactions.details" variant="h5" fontWeight="bold" />
					<IconButton onClick={close}>
						<CloseIcon txtKey={"X"} fontWeight={"bold"} />
					</IconButton>
				</TitleWrapper>
				<DetailsWrapper>
					<Row>
						<Item txtKey="transactions.date" variant="h6" />
						{/*TODO: 
            //t function somehow is not working for dates. Need to check later.
            // Adding an empty space for now to make it work */}
						<Value
							txtKey={`${" "}${transaction.transactionTime}`}
							variant="h6"
						/>
					</Row>
					<Row>
						<Item txtKey="transactions.status" variant="h6" />
						<Value
							txtKey={`transactionStatus.${transaction.status}`}
							variant="h6"
						/>
					</Row>
					<Row>
						<Item txtKey="transactions.owner" variant="h6" />
						<Value
							txtKey={normalizedUsers.byId[transaction.userId].name}
							variant="h6"
						/>
					</Row>
					<Row>
						<Item txtKey="transactions.amount" variant="h6" />
						<Value
							txtKey={localizeValue(+transaction.amount, transaction.currency)}
							variant="h6"
						/>
					</Row>
				</DetailsWrapper>
			</TransactionDetailsContainer>
		</Drawer>
	);
};

export default TransactionDetails;
