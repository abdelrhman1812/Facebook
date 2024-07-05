"use client";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from "react";
import { TokenContext } from "../(context)/tokenContext";
import { UserContext } from "../(context)/userData";
import { getUser } from "../(utilies)/postsOpreations";

export const NavBar = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const { token, setToken } = useContext(TokenContext);
    const pathname = usePathname();

    useEffect(() => {
        const getUserData = async () => {
            try {
                if (!token) {
                    return;
                }

                const id = jwtDecode(token)?.userId;
                const data = await getUser(id);
                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getUserData();
    }, [token, setUserInfo]);




    const logOut = () => {
        localStorage.removeItem("tokenArtical");
        setToken(null)
    };

    return <>
        <div className="bg-gray-50 z-50  fixed md:hidden p-2 shadow  w-full ">


            <div className="bg-info container mx-auto  flex  md:hidden justify-between items-center ">

                <div id="profile" className="space-y-3">
                    {userInfo && (
                        <Link href="/" className="flex justify-center">
                            <Image
                                src={userInfo?.user.profilePhoto || "data:image/jpeg;base64,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"}
                                height={50}
                                width={50}
                                className="w-10 md:w-16 rounded mx-auto"
                                alt={userInfo?.user.userName || "profile"}
                            />
                        </Link>
                    )}
                    <div className="hidden md:block">
                        <h2 className="font-medium text-xs md:text-sm text-center text-indigo-800">{userInfo?.user.userName}</h2>
                        <p className="text-xs text-gray-500 text-center">Front End Developer</p>
                    </div>
                </div>

                {/* LInks */}
                <div id="menu" className="flex  items-center justify-center  gap-3">
                    <Link href="/" className={`text-sm font-medium flex items-center gap-4 text-gray-700  py-2 px-2 hover:bg-indigo-600 hover:text-white  rounded-md transition duration-150 ease-in-out ${pathname === '/' ? 'bg-indigo-600 text-white' : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className="font-bold text-lg hidden md:block">Home</span>
                    </Link>
                    <Link href={`/profile/${parseInt(userInfo?.user.id)}`} className={`text-sm font-medium flex items-center gap-4 text-gray-700 py-2 px-2 hover:bg-indigo-500 hover:text-white  rounded-md transition duration-150 ease-in-out ${pathname === `/profile/${parseInt(userInfo?.user.id)}` ? "bg-indigo-600 text-white" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span className="font-bold text-lg hidden md:block">Profile</span>
                    </Link>

                    <Link href={`/setting/${parseInt(userInfo?.user.id)}`} className={`text-sm font-medium flex items-center gap-4 text-gray-700 py-2 px-2 hover:bg-indigo-500 hover:text-white  rounded-md transition duration-150 ease-in-out   ${pathname === `/setting/${parseInt(userInfo?.user.id)}` ? "bg-indigo-600 text-white" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span className="font-bold text-lg hidden md:block">Setting</span>
                    </Link>

                    <Link href="/signin" onClick={logOut} className="text-sm font-medium flex items-center gap-4 text-gray-700 py-2 px-2 hover:bg-indigo-500 hover:text-white  rounded-md transition duration-150 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                        <span className="font-bold text-lg hidden md:block">Log Out</span>
                    </Link>
                </div>
            </div>
        </div>
    </>
};
