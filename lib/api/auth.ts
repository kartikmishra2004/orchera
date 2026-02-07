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
        const data = await res.json();
        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Registration failed"
            };
        }
        return {
            success: true,
            data: data.data,
            message: data.message || "Registration successful"
        };
    } catch (error) {
        console.error("Failed to register user!!", error);
        return {
            success: false,
            message: "Network error. Please check your connection."
        };
    }
}

export async function uploadAvatar(avatar: File) {
    const data = new FormData();
    data.append("file", avatar);
    data.append("upload_preset", clientEnv.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    try {
        const res = await fetch(clientEnv.NEXT_PUBLIC_CLOUDINARY_URL!, {
            method: "POST",
            body: data
        });
        if (!res.ok) throw new Error("Cloudinary upload failed");
        const result = await res.json();
        return result.secure_url;
    } catch (error) {
        console.error("Failed to upload to cloudinary!!", error);
        throw error;
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
        const data = await res.json();
        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Login failed"
            };
        }
        return {
            success: true,
            data: data.data,
            message: data.message || "Login successful"
        };
    } catch (error) {
        console.error("Failed to login user!!", error);
        return {
            success: false,
            message: "Network error. Please check your connection."
        };
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
        const data = await res.json();
        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Session expired"
            };
        }
        return {
            success: true,
            data: data.data,
            message: data.message || "Session refreshed"
        };
    } catch (error) {
        console.error("Failed to refresh token!!", error);
        return {
            success: false,
            message: "Failed to refresh session"
        };
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
        const data = await res.json();
        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Logout failed"
            };
        }
        return {
            success: true,
            message: data.message || "Logged out successfully"
        };
    } catch (error) {
        console.error("Failed to logout user!!", error);
        return {
            success: false,
            message: "Failed to logout"
        };
    }
}