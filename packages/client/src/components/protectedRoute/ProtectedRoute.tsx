import { Suspense } from "react";
import {
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import {
  fetchCompanyData,
  fetchCurrentUser,
  fetchUsers,
} from "@shared/apis/interceptors";
import Sidebar from "@/components/sidebar/Sidebar";
import { User } from "@types/index";
import { RouteWrapper, ContentWrapper } from "./protectedRoute.styles";

type UsersContextType = { currentUser: User | null; users: User[] };

export const rootLoader = async () => {
  if (localStorage.getItem("token")) {
    const [companyData, currentUser, users] = await Promise.all([
      fetchCompanyData(),
      fetchCurrentUser(),
      fetchUsers(),
    ]);

    return { companyData, currentUser, users };
  }
  return null;
};

const ProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  //TODO: type data
  const data: any = useLoaderData();

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <RouteWrapper>
      {location.pathname === "/" ? <Navigate to="/dashboard" /> : null}
      <Sidebar
        companyName={data.companyData.legalName}
        currentUser={data.currentUser}
      />
      <Suspense fallback={<div>loading...</div>}>
        <ContentWrapper>
          <Outlet
            context={
              {
                currentUser: data.currentUser,
                users: data.users,
              } as UsersContextType
            }
          />
        </ContentWrapper>
      </Suspense>
    </RouteWrapper>
  );
};

export const useUsers = () => {
  return useOutletContext<UsersContextType>();
};

export default ProtectedRoute;