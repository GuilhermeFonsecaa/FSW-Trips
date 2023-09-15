import { Prisma } from '@prisma/client'
import React from 'react'
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import ptBR from 'date-fns/locale/pt-BR'
import { format } from "date-fns";
import Button from '@/Components/Button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

//typescript reconhecer que fez include
interface UserReservationProps {
    reservation: Prisma.TripReservationGetPayload<{
        include: { trip: true }
    }>
}

const UserReservationItem = ({ reservation }: UserReservationProps) => {

    const router = useRouter()

    const { trip } = reservation

    const handleDeleteClick = async () => {
        const res = await fetch(`/api/trips/reservation/${reservation.id}`,
            {
                method: "DELETE",
            },
        )

        if (!res) {
            return toast.error("Ocorreu um erro ao cancelar a viagem", { position: "bottom-center" })
        }

        toast.success("Viagem cancelada com sucesso!", { position: "bottom-center" });
        router.push('/')
   
    }

    return (
        <div className="container mx-auto p-5">

            {/*CARD*/}
            <div className="flex flex-col mt-5 p-5 border-grayLighter border-solid border shadow-lg rounded-lg">
                <div className="flex items-center gap-3 pb-4 border-b border-grayLighter border-solid">
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
                <div className="flex flex-col mt-5 text-primaryDarker">
                    <h3 className='text-sm'>Data:</h3>
                    <div className="flex items-center mt-1 gap-1">
                        <p className="text-sm">{format(new Date(reservation.startDate), "dd 'de' MMMM", { locale: ptBR })} - </p>
                        <p className="text-sm">{format(new Date(reservation.endDate), "dd 'de' MMMM", { locale: ptBR })}</p>
                    </div>
                    <h3 className="mt-5 text-sm">Hóspedes:</h3>
                    <p className="mt-1 items-center text-sm">{reservation.guests} hóspedes</p>
                </div>
                <div className='mt-5 border-b border-grayLighter border-solid'></div>
                <div className='flex flex-col mt-6'>
                    <h3 className="text-md font-semibold text-primaryDarker">Informações do pagamento:</h3>
                    <div className="flex justify-between mt-4">
                        <p className="text-primaryDarker text-sm">Total:</p>
                        <p className="font-medium text-sm">R${Number(reservation.totalPaid)}</p>
                    </div>
                    <Button onClick={handleDeleteClick} className='mt-6' variant='danger'>Cancelar</Button>
                </div>
            </div>
        </div>

    )
}


export default UserReservationItem;