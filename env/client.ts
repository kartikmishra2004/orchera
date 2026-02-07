import { z } from "zod";

const clientEnvSchema = z.object({
    NEXT_PUBLIC_AUTH_SERVICE_URL: z.string().url(),
    NEXT_PUBLIC_CLOUDINARY_URL: z.string().url(),
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string(),
});

export const clientEnv = clientEnvSchema.parse({
    NEXT_PUBLIC_AUTH_SERVICE_URL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL,
    NEXT_PUBLIC_CLOUDINARY_URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
});