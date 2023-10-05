import { prisma } from '@/lib/prisma';
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-08-16'
})


export async function POST(request: Request) {
    const sig = request.headers.get("stripe-signature")!; //saber que a requisição é do stripe
    const text = await request.text();
    const event = stripe.webhooks.constructEvent(text, sig, process.env.STRIPE_WEBHOOK_SECRET_KEY!)

    //se usuário pagou com sucesso cria a reserva
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;

        await prisma.tripReservation.create({
            data: {
                startDate: new Date(session.metadata.startDate),
                endDate: new Date(session.metadata.endDate),
                userId: session.metadata.userId,
                tripId: session.metadata.tripId,
                totalPaid: Number(session.metadata.totalPrice),
                guests: Number(session.metadata.guests),
            }
        })

    }
    return new Response(JSON.stringify({ received: true }), { status: 200 })
}