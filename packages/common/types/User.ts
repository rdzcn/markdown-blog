import type { SmeResponse } from "./Sme";

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

export interface RootLoaderResponse {
  currentUser: User;
  users: User[];
  companyData: SmeResponse;
}