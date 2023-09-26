
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


const generateSearchQuery = (destiny: string, startDate?: string | null, budget?: string | null) => {
    let searchQuery: any = {
        OR: [
            {
                name: {
                    search: destiny,
                },
            },
            {
                description: {
                    search: destiny,
                },
            },

            {
                location: {
                    search: destiny,
                },
            },
        ],
        AND: [],
    }
    if (startDate !== "undefined" && startDate !== "null") {
        searchQuery = {
            ...searchQuery,
            AND: [
                ...searchQuery.AND,
                {
                    startDate: {
                        gte: startDate,
                    },
                }]
        }
    }

    if (budget !== "undefined" && budget !== "null") {
        searchQuery = {
            ...searchQuery,
            AND: [
                ...searchQuery.AND,
                {
                    pricePerDay: {
                        lte: Number(budget)
                    }
                }]
        }
    }
    console.log({ searchQuery })
    return searchQuery;
}



export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const destiny = searchParams.get("destiny")
    const startDate = searchParams.get("startDate")
    const budget = searchParams.get("budget")

    if (!destiny) {
        return new NextResponse(JSON.stringify({
            message: "Missing destiny parameter",
        }), { status: 400 })
    }

    //pesquisar por nome,destino ou localização da viagem o que foi escrito em destiny
    const trips = await prisma.trip.findMany({
        where: generateSearchQuery(destiny, startDate, budget),
    })


    return new NextResponse(JSON.stringify(trips), { status: 200 });
}


