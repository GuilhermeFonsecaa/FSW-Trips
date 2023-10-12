"use client"

import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai'
import Link from "next/link";



const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = React.useState(false)
    const { status, data } = useSession()
    const handleLoginClick = () => signIn()
    const handleLogoutClick = () => signOut()
    const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

    return (
        <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center lg:border-b lg:border-grayLighter ">
            <Link href="/">
                <div className="relative h-[32px] w-[182px]">
                    <Image src="/logo.png" alt="Full Stack Week" fill />
                </div>
            </Link>

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
                            <div className="z-50 absolute top-12 left-0 w-full h-[100px] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">
                                <Link href='/my-trips' onClick={() => setMenuIsOpen(false)}>
                                    <button className="text-primary text-sm font-semibold pb-2 border-b border-grayLighter border-solid">Minhas Viagens</button>
                                </Link>
                                <button className="text-primary text-sm font-semibold pt-2" onClick={handleLogoutClick}>Logout</button>
                            </div>
                        )}
                    </div>
                )
            }

        </div >
    )
}


export default Header;