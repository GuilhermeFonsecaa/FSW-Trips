import { prisma } from '@/lib/prisma'
import { isBefore } from 'date-fns';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const req = await request.json();

    const trip = await prisma.trip.findUnique({
        where: {
            id: req.tripId,
        }
    })

    if (!trip) {
        return new NextResponse(
            JSON.stringify({
                error: {
                    code: 'TRIP_NOT_FOUND'
                }
            })
        )
    }

    //verifica se a data colocada pelo usuário(req.startDate) é antes da data da viagem(trip.startDate), gerando um error
    if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
        return new NextResponse(
            JSON.stringify({
                error: {
                    code: 'INVALID_START_DATE',
                }
            }),
            {
                status: 400,
            }
        )
    }

    const reservations = await prisma.tripReservation.findMany({
        where: {
            tripId: req.tripId,
            //Verifica se existe reserva entre as datas
            startDate: {
                lte: new Date(req.endDate) //lte menor ou igual
            },
            endDate: {
                gte: new Date(req.startDate) //gte maior ou igual
            }
        }
    })

    //viagem já reservada entre as datas 
    if (reservations.length > 0) {
        return new NextResponse(JSON.stringify({
            error: {
                code: 'TRIP_ALREADY_RESERVED',
            },
        })
        );
    }

    return new NextResponse(
        JSON.stringify({
            sucess: true,
        }))

}