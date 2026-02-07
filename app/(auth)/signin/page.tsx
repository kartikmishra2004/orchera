'use client'
import Link from 'next/link'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

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

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            console.log(res.message);
            router.replace("/dashboard");
        } catch (error) {
            console.log("Failed to signin", error);
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <button onClick={() => router.back()} className="absolute cursor-pointer top-6 left-6 text-zinc-400 hover:text-zinc-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </button>
            <div className="w-[25vw] h-[95vh] flex flex-col justify-between">
                <h1 className="w-full font-semibold h-10 tracking-tigh text text-zinc-700 gap-1 flex justify-center items-center">
                    <Image alt='' src='logo.svg' width={19} height={19} />
                    ORCHERA
                </h1>
                <form onSubmit={onSubmit} className='h-full w-full flex flex-col justify-center gap-4 items-center'>
                    <h1 className='text-zinc-700 text-xl font-medium'>Sign in</h1>
                    <div className="w-full space-y-3">
                        <button className="w-full gap-2 flex justify-center items-center text-sm font-normal text-zinc-700 h-9 cursor-pointer rounded-sm border-zinc-200 border-2">
                            <svg className='w-4.5 h-4.5' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            Continue with Google
                        </button>
                        <button className="w-full gap-2 flex justify-center items-center text-sm font-normal text-zinc-700 h-9 cursor-pointer rounded-sm border-zinc-200 border-2">
                            <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                            </svg>
                            Continue with Github
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
                    <button disabled={!formData.email || !formData.password} type='submit' className='bg-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed h-9 rounded-sm w-full text-sm font-normal text-zinc-50 cursor-pointer'>Continue</button>
                </form>
                <div className="w-full h-10 flex justify-center items-center">
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
                </div>
            </div>
        </div>
    );
}