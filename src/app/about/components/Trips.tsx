import { prisma } from '../../../lib/prisma'
import * as React from 'react';

const getTrips = async () => {
    const trips = await prisma.trip.findMany({})
}

const Trips = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts",
        {
            next: {
                revalidate: 0  //revalida o cache em segundos ou desativa com 0
            }
        }).then((res) => res.json())

    return (
        <div>
            {data.map((i: any) => (
                <p key={i.id}>{i.title}</p>
            ))}
        </div>
    )
}

export default Trips; 