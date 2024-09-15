export default {
	login: {
		login: "Login",
		welcomeBack: "Welcome back",
		loginTo: "Login to your FynnTeq account",
	},
	dashboard: {
		title: "Dashboard",
		clearFilters: "Clear filters",
	},
	error: {
		404: "This page doesn't exist!",
		401: "You aren't authorized to see this",
		503: "Looks like our API is down",
		default: "Oops! Something went wrong",
		failFetchTransactions: "Failed to fetch transactions. Please try again",
	},
	transactions: {
		details: "Transaction details",
		status: "Status",
		owner: "Owner",
		date: "Date",
		amount: "Amount",
	},
	transactionStatus: {
		REJECTED: "Rejected",
		PENDING: "Pending",
		COMPLETED: "Completed",
		REVERSED: "Reversed",
	},
	rejectionReason: {
		NOT_PERMITTED: "Not permitted",
		INSUFFICIENT_FUNDS: "Insufficient funds",
		CARD_MONTHLY_LIMIT_REACHED: "Card monthly limit reached",
		CARD_DAILY_LIMIT_REACHED: "Card daily limit reached",
		CARD_EXPIRED: "Card expired",
		CARD_SUSPENDED: "Card suspended",
		CARD_NOT_ACTIVE: "Card not active",
		INCORRECT_PIN: "Incorrect pin",
	},
};
