import { CssBaseline } from "@mui/material";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
	redirect,
} from "react-router-dom";
import GlobalStyles from "./assets/styles/global.styles";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import Layout from "./components/layout/Layout";
import ProtectedRoute, {
	rootLoader,
} from "./components/protectedRoute/ProtectedRoute";
import { TextsProvider } from "./contexts/texts.context";
import { ToastProvider } from "./contexts/toast.context";
import Articles from "./pages/articles/Articles";
import Dashboard from "./pages/dashboard/Dashboard";
import Login, { loginLoader } from "./pages/login/Login";
import "./main.css";

// Move this to a separate file
const router = createBrowserRouter([
	{
		id: "root",
		path: "/",
		loader: rootLoader,
		element: <ProtectedRoute />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "layout",
				element: <Layout />,
			},
			{
				path: "articles",
				element: <Articles />,
			},
			{
				path: "/*",
				element: <Navigate to="/articles" />,
			},
		],
	},
	{
		path: "login",
		loader: loginLoader,
		errorElement: <ErrorBoundary />,
		element: <Login />,
	},
	{
		path: "/logout",
		loader: async () => {
			localStorage.removeItem("token");
			return redirect("/login");
		},
	},
]);

function App() {
	return (
		<TextsProvider>
			<ToastProvider>
				<GlobalStyles />
				<CssBaseline enableColorScheme />
				<RouterProvider router={router} />
			</ToastProvider>
		</TextsProvider>
	);
}

export default App;
