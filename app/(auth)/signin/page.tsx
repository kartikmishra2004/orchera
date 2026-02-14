'use client'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { initGoogleAuth } from '@/lib/api/auth';
import AuthLogo from '@/components/auth/AuthLogo';
import AuthFooter from '@/components/auth/AuthFooter';

export default function Signin() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const { loginUser } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await loginUser(formData);
            console.log(res)
            if (res.success) {
                toast.success(res.message);
                router.replace("/dashboard");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error("Failed to signin", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        initGoogleAuth();
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-white relative">
            <button onClick={() => router.back()} className="absolute cursor-pointer top-6 left-6 text-zinc-400 hover:text-zinc-700 transition-colors z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </button>
            <div className="w-full max-w-md px-6 flex flex-col justify-between py-6 h-full">
                <AuthLogo />
                <form onSubmit={onSubmit} className='h-full w-full flex flex-col justify-center gap-4 items-center'>
                    <h1 className='text-zinc-700 text-xl font-medium'>Sign in</h1>
                    <div className="w-full space-y-3">
                        <button onClick={handleGoogleAuth} className="w-full gap-2 flex justify-center items-center text-sm font-normal text-zinc-700 h-9 cursor-pointer rounded-sm border-zinc-200 border-2 hover:bg-zinc-50 transition-colors">
                            <svg className='w-4.5 h-4.5' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                    <div className="w-[85%] h-px my-2 bg-zinc-200" />
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="Email" className='text-zinc-500 text-sm font-normal'>Email</label>
                        <input name='email' value={formData.email} onChange={onChange} placeholder='Enter your email' autoComplete='off' id='Email' type="email" className='rounded-sm px-2 text-sm font-normal text-zinc-700 border-zinc-200 border-2 h-9 placeholder:text-sm placeholder:text-zinc-200 placeholder:font-normal focus:outline-zinc-500' />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="Password" className='text-zinc-500 text-sm font-normal'>Password</label>
                        <input name='password' value={formData.password} onChange={onChange} placeholder='Enter your password' autoComplete='off' id='Password' type="password" className='rounded-sm px-2 text-sm font-normal text-zinc-700 border-zinc-200 border-2 h-9 placeholder:text-sm placeholder:text-zinc-200 placeholder:font-normal focus:outline-zinc-500' />
                    </div>
                    <p className='text-zinc-400 text-xs'>Don't have an account? <Link href='/signup' className='text-blue-400 hover:underline cursor-pointer'>Sign up</Link></p>
                    <button disabled={isSubmitting || !formData.email || !formData.password} type='submit' className='bg-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed h-9 rounded-sm w-full text-sm font-normal text-zinc-50 cursor-pointer transition-all shadow-lg shadow-blue-400/20'>
                        {isSubmitting ? "Signing in..." : "Continue"}
                    </button>
                </form>
                <AuthFooter />
            </div>
        </div>
    );
}