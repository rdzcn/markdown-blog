// import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
// import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
// import Layout from "./components/layout/Layout";
// import ProtectedRoute, {
//   rootLoader,
// } from "./components/protectedRoute/ProtectedRoute";
// import Articles, { articlesLoader } from "./pages/articles/Articles";
// import Article, { articleLoader } from "./pages/articles/components/Article";
// import Dashboard from "./pages/dashboard/Dashboard";
// import Login, { loginLoader } from "./pages/login/Login";

// export default createBrowserRouter([
//   {
//     id: "root",
//     path: "/",
//     loader: rootLoader,
//     element: <ProtectedRoute />,
//     errorElement: <ErrorBoundary />,
//     children: [
//       {
//         path: "dashboard",
//         element: <Dashboard />,
//       },
//       {
//         path: "layout",
//         element: <Layout />,
//       },
//       {
//         path: "articles",
//         element: <Articles />,
//         loader: articlesLoader,
//       },
//       {
//         path: "articles/:id",
//         element: <Article />,
//         loader: articleLoader,
//       },
//       {
//         path: "/*",
//         element: <Navigate to="/articles" />,
//       },
//     ],
//   },
//   {
//     path: "login",
//     loader: loginLoader,
//     errorElement: <ErrorBoundary />,
//     element: <Login />,
//   },
//   {
//     path: "/logout",
//     loader: async () => {
//       localStorage.removeItem("token");
//       return redirect("/login");
//     },
//   },
// ]);
