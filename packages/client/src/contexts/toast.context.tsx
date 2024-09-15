import NotificationContainer from "@components/toast/Toast";
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useState,
} from "react";

type ToastContextI = {
	addToast: (toast: Toast) => void;
};

interface Toast {
	txtKey: string;
}

const ToastContext = createContext<ToastContextI | null>(null);

export const useToast = (): ToastContextI => {
	const context = useContext<ToastContextI | null>(ToastContext);
	if (!context) {
		throw new Error(`useToast must be used within a ToastProvider`);
	}
	return context;
};

type ToastProviderProps = { children: ReactNode };

export const ToastProvider = ({ children }: ToastProviderProps) => {
	const [toast, setToast] = useState<Toast | null>(null);

	const addToast = useCallback(
		(newToast: Toast) => {
			setToast(newToast);
		},
		[setToast],
	);

	const value: ToastContextI = {
		addToast,
	};

	return (
		<ToastContext.Provider value={value}>
			{children}
			{toast && (
				<NotificationContainer
					key={toast.txtKey}
					txtKey={toast.txtKey}
					setToast={setToast}
				/>
			)}
		</ToastContext.Provider>
	);
};
