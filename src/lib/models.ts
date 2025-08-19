export interface Login {
	user: LoginUser;
	accessToken: string;
}

export interface LoginUser {
	id: number;
	email: string;
	avatarUrl: string;
	createdAt: string;
	updatedAt: string;
}

export interface Register {
	user: RegisterUser;
	accessToken: string;
}

export interface RegisterUser {
	id: number;
	email: string;
	avatarUrl?: string;
	createdAt: string;
	updatedAt: string;
}