// Existing user-related interfaces
import {Comp} from "@/app/components/Canvas/components/type";

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

// New Component-related types
// export interface BaseComponent {
// 	id: string; // Unique identifier for each component
// 	type: string; // Component type (e.g., "text", "image", "card")
// 	[key: string]: string | number | boolean; // Allow additional properties for specific component types
// }

export type Components = Comp[]; // Array of components

export interface Canvas {
	id: number;
	userId: number;
	title: string;
	components: Components; // Replace 'any' with Components type
	createdAt: string;
	updatedAt: string;
}

export interface CreateCanvasRequest {
	userId: number;
	title: string;
	components: Components; // Use the Components type
}

export interface UpdateCanvasRequest {
	title: string;
	components: Components; // Use the Components type
}