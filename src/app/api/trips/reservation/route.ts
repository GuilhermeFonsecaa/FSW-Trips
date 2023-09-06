import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const req = await request.json();

    const { tripId, startDate, endDate, guests, userId, totalPaid, } = req;

    const trip = await prisma.trip.findUnique({
        where: {
            id: tripId,
        },
    });

    if (!trip) {
        return new NextResponse(
            JSON.stringify({
                error: {
                    code: "TRIP_NOT_FOUND",
                },
            })
        );
    }

    await prisma.tripReservation.create({
        data: {
            tripId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            guests,
            userId,
            totalPaid,
        },
    });

    return new NextResponse(
        JSON.stringify({
            success: true,
        }),
        { status: 201 }
    );
}