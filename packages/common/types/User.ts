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

export interface Article {
  title: string;
  content: string;
  authorId: string;
  id: string;
  createdAt: string;
}