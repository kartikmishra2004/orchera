'use client'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, uploadAvatar } from '@/lib/api/auth';
import { RegisterPayload } from '@/types/authTypes';
import { useAuth } from "@/context/AuthContext";
import { toast } from 'sonner';
import AuthLogo from '@/components/auth/AuthLogo';
import AuthFooter from '@/components/auth/AuthFooter';

export default function Onboarding() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>('');
    const [uploadError, setUploadError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { registerUser } = useAuth();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 8 * 1024 * 1024;

        if (!validTypes.includes(file.type)) {
            setUploadError('Please upload a .png or .jpeg file');
            toast.error('Please upload a .png or .jpeg file');
            return;
        }

        if (file.size > maxSize) {
            setUploadError('File size must be less than 8MB');
            toast.error('File size must be less than 8MB');
            return;
        }

        const img = document.createElement('img');
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            if (img.width < 500 || img.height < 500) {
                setUploadError('Image must be at least 500px by 500px');
                toast.error('Image must be at least 500px by 500px');
                URL.revokeObjectURL(objectUrl);
            } else {
                setUploadError('');
                setAvatarFile(file);
                setAvatarPreview(objectUrl);
            }
        };

        img.src = objectUrl;
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = sessionStorage.getItem("email");

        if (!email) {
            toast.error("Session missing. Please start over.");
            router.replace("/signup");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }


        if (!avatarFile) {
            toast.error("Please upload a profile picture");
            return;
        }

        const payload: RegisterPayload = {
            fullName,
            email,
            password,
        }

        setIsSubmitting(true);
        try {
            const res = await registerUser(payload, avatarFile);
            if (res.success) {
                toast.success(res.message);
                router.replace("/dashboard");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error("Failed to onboard!!", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full h-screen flex flex-col items-center bg-zinc-100 overflow-x-hidden relative">
            <button onClick={() => router.back()} className="absolute cursor-pointer top-6 left-6 text-zinc-400 hover:text-zinc-700 transition-colors z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </button>
            <div className="w-full max-w-7xl px-4 flex flex-col justify-between items-center h-full py-6">
                <AuthLogo />
                <div className="w-full max-w-262.5 flex-1 bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex overflow-hidden mb-8 min-h-0 lg:h-[75vh]">
                    <div className="w-full lg:w-[45%] p-8 md:p-10 lg:p-14 flex flex-col justify-center min-h-0 overflow-y-auto">
                        <form onSubmit={onSubmit} className='h-full w-full flex flex-col justify-center gap-4 items-center'>
                            <h1 className='text-zinc-700 text-xl md:text-2xl font-medium mb-2 md:mb-4 text-center'>Let's get to know you</h1>

                            <div className="flex flex-col w-full gap-1">
                                <div className="flex items-center gap-4 md:gap-5">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-50 flex items-center justify-center overflow-hidden border border-zinc-200 shrink-0">
                                        {avatarPreview ? (
                                            <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <svg className="w-6 h-6 md:w-7 md:h-7 text-zinc-200" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h3 className="text-zinc-500 mb-2 md:mb-3 text-xs md:text-sm font-normal">Profile picture</h3>
                                        <label htmlFor="avatar-upload" className="w-full px-4 gap-2 flex justify-center items-center text-[10px] md:text-xs font-normal text-zinc-700 h-8 cursor-pointer rounded-sm border-zinc-200 border-2 hover:bg-zinc-50 transition-colors">
                                            Upload image
                                        </label>
                                        <input
                                            autoComplete='off'
                                            id="avatar-upload"
                                            type="file"
                                            accept=".png,.jpeg,.jpg,image/png,image/jpeg"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                        {uploadError ? (
                                            <p className="text-[10px] text-red-500">{uploadError}</p>
                                        ) : (
                                            <p className="text-[10px] text-zinc-400">.png, .jpeg files up to 8mb</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="fullName" className="text-zinc-500 text-xs md:text-sm font-normal">Full name</label>
                                <input
                                    id="fullName"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your full name"
                                    autoComplete='off'
                                    className='rounded-sm px-2 text-sm font-normal text-zinc-700 border-zinc-200 border-2 h-9 placeholder:text-sm placeholder:text-zinc-200 placeholder:font-normal focus:outline-zinc-500'
                                />
                            </div>

                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="password" className="text-zinc-500 text-xs md:text-sm font-normal">Password</label>
                                <input
                                    autoComplete='off'
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className='rounded-sm px-2 text-sm font-normal text-zinc-700 border-zinc-200 border-2 h-9 placeholder:text-sm placeholder:text-zinc-200 placeholder:font-normal focus:outline-zinc-500'
                                />
                            </div>

                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="confirmPassword" className="text-zinc-500 text-xs md:text-sm font-normal">Confirm password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className='rounded-sm px-2 text-sm font-normal text-zinc-700 border-zinc-200 border-2 h-9 placeholder:text-sm placeholder:text-zinc-200 placeholder:font-normal focus:outline-zinc-500'
                                />
                            </div>

                            <button
                                disabled={isSubmitting || !fullName || !password || !confirmPassword || !!uploadError}
                                type="submit"
                                className='bg-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed h-9 rounded-sm w-full text-sm font-normal text-zinc-50 cursor-pointer shadow-lg shadow-blue-400/20 transition-all'
                            >
                                {isSubmitting ? "Creating account..." : "Create account"}
                            </button>
                        </form>
                    </div>

                    <div className="hidden lg:flex flex-1 bg-white border-l border-zinc-200 items-start justify-start relative overflow-hidden">
                        <div className="absolute top-[8%] left-[8%] w-[130%] h-[110%] bg-white rounded-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-zinc-200 flex flex-col overflow-hidden origin-top-left transition-transform duration-700 hover:scale-[1.02]">
                            <div className="h-10 border-b border-zinc-100 flex items-center px-4 gap-2 bg-white shrink-0">
                                <div className="w-5 h-5 bg-blue-400 rounded-xs" />
                                <div className="flex items-center gap-1.5 px-2">
                                    <div className="text-[11px] font-semibold text-zinc-700">Teamspace</div>
                                    <svg className="w-3 h-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                                <div className="flex-1 h-px bg-zinc-100 mx-4" />
                                <div className="w-24 h-2 bg-zinc-100 rounded-full" />
                            </div>

                            <div className="flex-1 flex min-h-0 bg-white">
                                <div className="w-52 border-r border-zinc-100 flex flex-col p-4 shrink-0 bg-white">
                                    <div className="w-full h-8 rounded-md border border-zinc-200 bg-zinc-50 flex items-center px-2 gap-2 mb-6">
                                        <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                        <div className="w-20 h-2 bg-zinc-200/50 rounded-full" />
                                    </div>
                                    <div className="space-y-5">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-4 h-4 rounded-sm bg-zinc-200" />
                                                <div className={`h-2 bg-zinc-100 rounded-full ${i % 2 === 0 ? 'w-16' : 'w-24'}`} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-auto pt-4 flex flex-col gap-4 border-t border-zinc-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded-sm bg-zinc-200" />
                                            <div className="w-20 h-2 bg-zinc-100 rounded-full" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-zinc-200" />
                                            <div className="w-16 h-2 bg-zinc-100 rounded-full" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col bg-white">
                                    <div className="h-10 border-b border-zinc-100 flex items-center px-6 gap-6 shrink-0 bg-white">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-600 rounded-[1px]" />
                                            <div className="w-24 h-2.5 bg-zinc-100 rounded-full" />
                                            <svg className="w-3 h-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-600 rounded-[1px]" />
                                            <div className="w-24 h-2.5 bg-zinc-100 rounded-full" />
                                            <svg className="w-3 h-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-3 bg-white">
                                        {[...Array(15)].map((_, i) => (
                                            <div key={i} className="flex items-center gap-4 py-1.5 border-b border-zinc-100">
                                                <div className="w-4 h-4 rounded-sm border border-zinc-200 shrink-0" />
                                                <div className="w-4 h-4 rounded-full bg-zinc-100 shrink-0" />
                                                <div className={`h-2.5 bg-zinc-100/80 rounded-full ${i % 3 === 0 ? 'w-[60%]' : i % 3 === 1 ? 'w-[40%]' : 'w-[75%]'}`} />
                                                <div className="ml-auto flex gap-6">
                                                    <div className="w-16 h-2 bg-zinc-100 rounded-full" />
                                                    <div className="w-4 h-4 rounded-full bg-zinc-100" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AuthFooter />
            </div>
        </div>
    );
}