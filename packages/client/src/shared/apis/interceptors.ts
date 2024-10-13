import type {
	LoginCredentials,
	LoginResponse,
	SmeResponse,
	Transaction,
	TransactionStatus,
	TransactionPagination,
	User,
	ArticleData,
} from "@@types/index";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://localhost:5173/",
	timeout: 60000,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
	},
});

// INTERCEPTORS

//request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		if (config.url && !config.url.includes("/login")) {
			const token = localStorage.getItem("token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error): Promise<unknown> => {
		return Promise.reject(error);
	},
);

//response interceptor
axiosInstance.interceptors.response.use(
	async (response) => {
		const responseData = response.data;
		const requestUrl = response.config.url;

		if (requestUrl?.includes("/login")) {
			localStorage.setItem("token", responseData.token);
		}
		return responseData;
	},

	async (error): Promise<unknown> => {
		if (!error?.response) {
			throw error;
		}
		if (error.response.status === 401 && !error.config.url.includes("/login")) {
			localStorage.removeItem("token");
			window.location.href = "/login";
			return;
		}
		return Promise.reject({
			data: error.response.data,
			status: error.response.status,
			statusText: error.response.statusText,
		});
	},
);

//REQUESTS
export const sendRequest = <T, R>(config: AxiosRequestConfig) => {
	return axiosInstance.request<T, R>(config);
};

export function sendGetJson<T, R>(path: string) {
	return sendRequest<T, R>({
		url: path,
		method: "get",
	});
}

export function sendPostJson<T, R>(path: string, data?: unknown) {
	return sendRequest<T, R>({
		url: path,
		method: "post",
		data: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
}

//API CALLS
export function fetchToken(loginPayload: LoginCredentials) {
	return sendPostJson<unknown, LoginResponse>("/login", loginPayload);
}

export function fetchCompanyData() {
	return sendGetJson<unknown, SmeResponse>("/sme-data");
}

export function fetchUsers() {
	return sendGetJson<unknown, User[]>("/users");
}

export function fetchCurrentUser() {
	return sendGetJson<unknown, User>("/current-user");
}

export function fetchTransactions(params: {
	userId?: string;
	status?: TransactionStatus;
	offset?: number;
	limit?: number;
}) {
	const queryStringParams: string[] = [];
	for (const [key, value] of Object.entries(params)) {
		if (value) {
			queryStringParams.push(
				`${encodeURIComponent(key)}=${encodeURIComponent(`${value}`)}`,
			);
		}
	}


	return sendGetJson<
		unknown,
		{ data: Transaction[]; meta: TransactionPagination }
	>(`/transactions?${queryStringParams.join("&")}`);
}

export function fetchArticles() {
	return sendGetJson<unknown, ArticleData[]>("/articles");
}