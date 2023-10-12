'use client'

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import UserReservationItem from '@/app/my-trips/Components/UserReservationItem'
import Button from "@/Components/Button";
import Link from "next/link";


const MyTrips = () => {
    const { status, data } = useSession();
    const [reservations, setReservations] = useState<
        Prisma.TripReservationGetPayload<{
            include: { trip: true }
        }>[]
    >([])
    const router = useRouter();

    const fetchReservations = async () => {
        const res = await fetch(`/api/user/${(data?.user as any)?.id}/reservations`)
        const json = await res.json();

        setReservations(json)
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            return router.push('/')
        }
        fetchReservations();
    }, [status])

    return (
        <div className="container mx-auto p-5">
            <h1 className="font-semibold text-primaryDarker lg:text-xl lg:mb-5">Minhas viagens</h1>
            {reservations.length > 0 ? (
                <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-14">
                    {reservations?.map((reservation =>
                        <UserReservationItem key={reservation.id} reservation={reservation} fetchReservations={fetchReservations} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col">
                    <p className="mt-2 font-medium text-primaryDarker">Você ainda não tem nenhuma reserva :(</p>
                    <Link href='/'> <Button className="w-full mt-5" variant="primary">Fazer reserva</Button></Link>
                </div>
            )}
        </div>
    )

}

export default MyTrips;