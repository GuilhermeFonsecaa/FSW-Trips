"use client"

import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai'


const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = React.useState(false)
    const { status, data } = useSession()
    const handleLoginClick = () => signIn()
    const handleLogoutClick = () => signOut()
    const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

    return (
        <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
            <div className="relative h-[32px] w-[182px]">
                <Image src="/logo.png" alt="Full Stack Week" fill />
            </div>

            {
                status === 'unauthenticated' && (
                    <button onClick={handleLoginClick} className="text-primary text-sm font-semibold">Login</button>
                )
            }

            {
                status === 'authenticated' && data.user && (
                    <div className="flex items-center gap-5 border-graySecondary border border-solid rounded-full relative p-2 px-3">
                        <AiOutlineMenu size={16} onClick={handleMenuClick} className="cursor-pointer" />
                        <Image height={31} width={31} src={data.user.image!} alt={data.user.name!} className="rounded-full shadow-md" />
                        {menuIsOpen && (
                            < div className="absolute top-12 left-0 w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
                                <button className="text-primary text-sm font-semibold" onClick={handleLogoutClick}>Logout</button>
                            </div>

                        )}
                    </div>
                )
            }

        </div >
    )
}


export default Header;