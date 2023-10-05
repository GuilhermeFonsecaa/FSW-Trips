'use client'

import { Trip } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import ptBR from 'date-fns/locale/pt-BR'
import Button from "@/Components/Button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify"
import { loadStripe } from "@stripe/stripe-js";


const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
    const [trip, setTrip] = useState<Trip | null>();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const searchParams = useSearchParams() //pega todas querys da url
    const router = useRouter()
    const { status, data } = useSession();

    console.log(data?.user)

    useEffect(() => {
        const fetchTrip = async () => {
            const response = await fetch("http://localhost:3000/api/trips/check", {
                method: "POST",
                body: JSON.stringify({
                    tripId: params.tripId,
                    startDate: searchParams.get('startDate'),
                    endDate: searchParams.get('endDate'),
                    guests: searchParams.get('guests'),
                })
            })
            const res = await response.json()
            setTrip(res.trip)
            setTotalPrice(res.totalPrice)

            if (res.error) {
                return router.push('/');
            }
        };

        if (status === 'unauthenticated') {
            router.push('/')
        }

        fetchTrip()
    }, [status])


    if (!trip) {
        return null;
    }
    
    const handleBuyClick = async () => {
        const res = await fetch("http://localhost:3000/api/payment", {
            method: "POST",
            body: Buffer.from(
                JSON.stringify({
                    tripId: params.tripId,
                    startDate: searchParams.get("startDate"),
                    endDate: searchParams.get("endDate"),
                    guests: Number(searchParams.get("guests")),
                    totalPrice,
                    coverImage: trip.coverImage,
                    name: trip?.name,
                    description: trip?.description,
                })
            ),
        });

        if (!res.ok) {
            return toast.error("Ocorreu um erro ao realizar a reserva", { position: "bottom-center" });
        }

        const { sessionId } = await res.json();
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string); 
        await stripe?.redirectToCheckout({sessionId}) //redireciona para checkout

        toast.success("Reserva realizada com sucesso!", { position: "bottom-center" });
    };


    const startDate = new Date(searchParams.get('startDate') as string);
    const endDate = new Date(searchParams.get('endDate') as string);
    const guests = searchParams.get('guests');

    //verificar essa validação se é para colocar aqui ou na chamada da requisição, para verificar se a pessoa trocou as datas da url para datas que não são possíveis reservar

    return (
        <div className="container mx-auto p-5">
            <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>

            {/*CARD*/}
            <div className="flex flex-col mt-5 p-5 border-grayLighter border-solid border shadow-lg rounded-lg">
                <div className="flex items-center gap-3 pb-3 border-b border-grayLighter border-solid">
                    <div className="relative h-[106px] w-[124px]">
                        <Image className="rounded-lg" src={trip.coverImage} alt={trip?.name} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl text-primaryDarker font-semibold">{trip.name}</h2>
                        <div className="flex items-center gap-1 my-1 ">
                            <ReactCountryFlag countryCode={trip.countryCode} svg />
                            <p className='text-xs text-grayPrimary'>{trip.location}</p>
                        </div>
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-primaryDarker mt-5">Informações sobre o preço:</h3>
                <div className="flex justify-between">
                    <p className="text-primaryDarker">Total:</p>
                    <p className="font-medium">R${totalPrice}</p>
                </div>
            </div>

            <div className="flex flex-col mt-5 text-primaryDarker">
                <h3 className="font-semibold">Data:</h3>
                <div className="flex items-center gap-1 mt-1">
                    <p className="">{format(startDate, "dd 'de' MMMM", { locale: ptBR })} - </p>
                    <p className="">{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
                </div>
                <h3 className="font-semibold mt-5">Hospédes:</h3>
                <p className="mt-1 items-center">{guests} hóspedes</p>
                <Button onClick={handleBuyClick} className="mt-5" variant="primary">Finalizar Compra</Button>
            </div>


        </div>
    )
}



export default TripConfirmation;