import React from "react";
import { prisma } from '@/lib/prisma'
import TripHeader from "./Components/TripHeader";
import TripReservation from "./Components/TripReservation";
import TripDescription from "./Components/TripDescription";
import TripHighlights from "./Components/TripHighlights";
import TripLocation from "./Components/TripLocation";

const getTripDetails = async (tripId: string) => {
    const trip = await prisma.trip.findUnique({
        where: {
            id: tripId,
        },
    });

    return trip;
};


//component async pois é server component, pegando o parametro da url
const TripDetails = async ({ params }: { params: { tripId: string } }) => {
    const trip = await getTripDetails(params.tripId);

    if (!trip) return null

    return (
        <div className="container mx-auto lg:px-40">
            <TripHeader trip={trip} />
            <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-20">
                <div className="lg:order-2">
                    <TripReservation tripId={trip.id} maxGuests={trip.maxGuests} tripStartDate={trip.startDate} tripEndDate={trip.endDate} pricePerDay={trip.pricePerDay as any} />
                </div>
                <div className="lg:order-1">
                    <TripDescription description={trip.description} />
                    <TripHighlights highlights={trip.highlights} />
                </div>
            </div>
            <TripLocation location={trip.location} locationDescription={trip.locationDescription} />
        </div>

    )

}

export default TripDetails;