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
            <h1 className="font-semibold text-primaryDarker text-xl">Minhas viagens</h1>
            {reservations.length > 0 ? reservations?.map((reservation =>
                <UserReservationItem key={reservation.id} reservation={reservation} fetchReservations={fetchReservations} />
            )) :
                <div className="flex flex-col">
                    <p className="mt-2 font-medium text-primaryDarker">Você ainda não tem nenhuma reserva :(</p>
                    <Link href='/'> <Button className="w-full mt-5" variant="primary">Fazer reserva</Button></Link>
                </div>
            }
        </div>
    )
}

export default MyTrips;