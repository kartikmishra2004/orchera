import { RegisterPayload, LoginPayload } from "@/types/authTypes"
import { clientEnv } from "@/env/client";

export async function register(payload: RegisterPayload) {
    try {
        const res = await fetch(
            `${clientEnv.NEXT_PUBLIC_AUTH_SERVICE_URL}/api/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                credentials: 'include',
            }
        )
        return res.json();
    } catch (error) {
        console.log("Failed to register user!!")
    }
}

export async function uploadAvatar(avatar: File) {
    const data = new FormData();
    data.append("file", avatar);
    data.append("upload_preset", clientEnv.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    try {
        const res = await fetch(clientEnv.NEXT_PUBLIC_CLOUDINARY_URL, {
            method: "POST",
            body: data
        });
        const result = await res.json();
        return result.secure_url;
    } catch (error) {
        console.log("Failed to upload to cloudinary!!")
    }
}

export async function login(payload: LoginPayload) {
    try {
        const res = await fetch(
            `${clientEnv.NEXT_PUBLIC_AUTH_SERVICE_URL}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                credentials: 'include',
            }
        );
        return res.json();
    } catch (error) {
        console.log("Failed to login user!!");
    }
}

export async function refresh() {
    try {
        const res = await fetch(
            `${clientEnv.NEXT_PUBLIC_AUTH_SERVICE_URL}/api/auth/refresh-token`,
            {
                method: "GET",
                credentials: 'include',
            }
        );
        return res.json();
    } catch (error) {
        console.log("Failed to refresh token!!")
    }
}

export async function logout() {
    try {
        const res = await fetch(
            `${clientEnv.NEXT_PUBLIC_AUTH_SERVICE_URL}/api/auth/logout`,
            {
                method: "POST",
                credentials: 'include',
            }
        );
        return res.json();
    } catch (error) {
        console.log("Failed to logout user!!")
    }
}