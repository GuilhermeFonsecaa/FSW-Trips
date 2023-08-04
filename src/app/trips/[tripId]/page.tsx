import React from "react";
import Image from "next/image"
import { prisma } from '@/lib/prisma'
import ReactCountryFlag from 'react-country-flag';
import TripHeader from "./Components/TripHeader";
import TripReservation from "./Components/TripReservation";
import TripDescription from "./Components/TripDescription";

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
            <TripReservation trip={trip} />
            <TripDescription description={trip.description} />
        </div>

    )

}

export default TripDetails;