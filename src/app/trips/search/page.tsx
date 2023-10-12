'use client'

import TripItem from "@/Components/TripItem";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Trips = () => {
    const [trips, setTrips] = React.useState<Trip[]>([])
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchTrips = async () => {
            const res = await fetch(`/api/trips/search?destiny=${searchParams.get("destiny") ?? ""}&startDate=${searchParams.get("startDate")}&budget=${searchParams.get("budget")}`);
            const data = await res.json();

            console.log(data)
            setTrips(data)
        };

        fetchTrips();
    }, [])


    return (
        <div className="container p-5 mx-auto flex flex-col items-center lg:items-start lg:pt-10">
            <h1 className="font-semibold text-xl text-primaryDarker lg:w-full lg:text-left lg:text-[2.5rem]">Viagens Encontradas</h1>
            <h2 className="text-sm font-medium text-primaryDarker mt-2 mb-5 lg:mt-6 lg:w-full lg:text-left">
                {trips.length > 0 ? "Listamos as melhores hospedagens para você!" : "Não encontramos nada nos seus parâmetros :("}
            </h2>
            <div className="flex flex-col gap-5 lg:grid lg:grid-cols-4 lg:gap-10 lg:mt-6 lg:pb-16">
                {trips?.map((trip) => (
                    <TripItem key={trip.id} trip={trip} />
                ))}
            </div>
        </div>
    )
}

export default Trips;