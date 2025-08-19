// src/lib/request.ts
import {del, get, post, put} from './api';
import {Canvas, Components, CreateCanvasRequest, Login, Register, UpdateCanvasRequest} from './models';

/**
 * User authentication API functions
 */

// Login function
export const login = async (email: string, password: string): Promise<Login> => {
    return await post<Login>('/auth/login', {email, password});
};

// Register function
export const register = async (email: string, password: string): Promise<Register> => {
    return await post<Register>('/auth/register', {email, password});
};

/**
 * Canvas API functions
 */

// Create a new canvas
export const createCanvas = async (createCanvasDto: Omit<CreateCanvasRequest, 'userId'> & {
    title: string;
    components: Components
}): Promise<Canvas> => {
    return await post<Canvas>('/canvas', createCanvasDto);
};

// Get all canvases for a specific user
export const getUserCanvases = async (): Promise<Canvas[]> => {
    return await get<Canvas[]>('/canvas');
};

// Get a specific canvas by ID
export const getCanvasById = async (id: number): Promise<Canvas> => {
    return await get<Canvas>(`/canvas/${id}`);
};

// Update a canvas
export const updateCanvas = async (id: number, updateCanvasDto: UpdateCanvasRequest): Promise<Canvas> => {
    return await put<Canvas>(`/canvas/${id}`, updateCanvasDto);
};

// Delete a canvas
export const deleteCanvas = async (id: number): Promise<void> => {
    return await del<void>(`/canvas/${id}`);
};