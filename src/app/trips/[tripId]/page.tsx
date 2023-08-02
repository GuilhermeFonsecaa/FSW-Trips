import React from "react";
import Image from "next/image"
import { prisma } from '@/lib/prisma'
import ReactCountryFlag from 'react-country-flag';
import TripHeader from "./Components/TripHeader";

const getTripDetails = async (tripId: string) => {
    const trip = await prisma.trip.findUnique({
        where: {
            id: tripId,
        },
    });

    return trip;
};


//component async pois é server component
const TripDetails = async ({ params }: { params: { tripId: string } }) => {
    const trip = await getTripDetails(params.tripId);

    if (!trip) return null

    return (
        <div className="container mx-auto">
            <TripHeader trip={trip} />
        </div>
    )
}

export default TripDetails;