'use client'
import Link from 'next/link'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, uploadAvatar } from '@/lib/api/auth';
import { RegisterPayload } from '@/types/authTypes';
import { useAuth } from "@/context/AuthContext";

export default function Onboarding() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>('');
    const [uploadError, setUploadError] = useState<string>('');
    const { registerUser } = useAuth();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 8 * 1024 * 1024;

        if (!validTypes.includes(file.type)) {
            setUploadError('Please upload a .png or .jpeg file');
            return;
        }

        if (file.size > maxSize) {
            setUploadError('File size must be less than 8MB');
            return;
        }

        const img = document.createElement('img');
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            if (img.width < 500 || img.height < 500) {
                setUploadError('Image must be at least 500px by 500px');
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
            router.replace("/signup");
            return;
        }

        if (password !== confirmPassword) {
            console.log("Password does not match!!");
            return;
        }


        if (!avatarFile) {
            throw new Error("Avatar file is required");
        }

        const payload: RegisterPayload = {
            fullName,
            email,
            password,
        }

        try {
            const res = await registerUser(payload, avatarFile);
            console.log(res.message);
            router.replace("/dashboard");
        } catch (error) {
            console.log("Failed to onboard!!", error);
        }
    }

    return (
        <div className="w-full h-screen flex flex-col items-center bg-zinc-100 overflow-hidden px-4">
            <button onClick={() => router.back()} className="absolute cursor-pointer top-6 left-6 text-zinc-400 hover:text-zinc-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </button>
            <header className="w-full max-w-275 h-12 flex justify-center items-center my-6 shrink-0">
                <h1 className="w-full font-semibold h-10 tracking-tigh text text-zinc-700 gap-1 flex justify-center items-center">
                    <Image alt='' src='logo.svg' width={19} height={19} />
                    ORCHERA
                </h1>
            </header>
            <div className="w-full max-w-262.5 flex-1 bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex overflow-hidden mb-8 min-h-0">
                <div className="w-[45%] p-10 lg:p-14 flex flex-col justify-center min-h-0 overflow-y-auto">
                    <form onSubmit={onSubmit} className='h-full w-full flex flex-col justify-center gap-4 items-center'>
                        <h1 className='text-zinc-700 text-2xl font-medium mb-4'>Let's get to know you</h1>

                        <div className="flex flex-col w-full gap-1">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-full bg-zinc-50 flex items-center justify-center overflow-hidden border border-zinc-200 shrink-0">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <svg className="w-7 h-7 text-zinc-200" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <h3 className="text-zinc-500 mb-3 text-sm font-normal">Profile picture</h3>
                                    <label htmlFor="avatar-upload" className="w-full gap-2 flex justify-center items-center text-xs font-normal text-zinc-700 h-8 cursor-pointer rounded-sm border-zinc-200 border-2">
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
                                        <p className="text-[10px] text-zinc-400">.png, .jpeg files up to 8mb at least 500px by 500px</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="fullName" className="text-zinc-500 text-sm font-normal">Full name</label>
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
                            <label htmlFor="password" className="text-zinc-500 text-sm font-normal">Password</label>
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
                            <label htmlFor="confirmPassword" className="text-zinc-500 text-sm font-normal">Confirm password</label>
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
                            disabled={!fullName || !password || !confirmPassword}
                            type="submit"
                            className='bg-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed h-9 rounded-sm w-full text-sm font-normal text-zinc-50 cursor-pointer'
                        >
                            Create account
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
            <footer className="h-10 w-[25vw] flex justify-center items-center mb-6">
                <ul className="w-full px-10 text-zinc-400 flex justify-between text-xs">
                    <li>
                        <Link href='/'>
                            © Orchera systems
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            Privacy
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            Support
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            Pricing
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
    );
}