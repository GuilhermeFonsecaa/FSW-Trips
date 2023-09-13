'use client'

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TripReservation } from "@prisma/client";



const MyTrips = () => {
    const { status, data } = useSession();
    const [reservations, setReservations] = useState<TripReservation[]>([])
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated" || !data?.user) {
            return router.push('/')
        }

        const fetchReservations = async () => {
            const res = await fetch(`http://localhost:3000/api/user/${(data?.user as any).id}/reservations`)
            const json = await res.json();

            console.log(json)
            setReservations(json)
        }

        fetchReservations();

    }, [status])

    return (
        <div></div>
    )
}

export default MyTrips;