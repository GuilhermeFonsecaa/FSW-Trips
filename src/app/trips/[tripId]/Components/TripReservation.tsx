'use client'

import React from 'react'
import DatePicker from '@/Components/DatePicker';
import Input from '@/Components/Input';
import { Trip } from '@prisma/client';
import Button from '@/Components/Button';

interface TripReservationProps {
    trip: Trip
}

const TripReservation = ({ trip }: TripReservationProps) => {
    return (
        <div className="flex flex-col px-5">
            <div className='flex gap-4'>
                <DatePicker className='w-full' placeholderText='Data de Ínicio' onChange={() => { }} />
                <DatePicker className='w-full' placeholderText='Data Final' onChange={() => { }} />
            </div>
            <Input placeholder={`Número máximo de hóspedes (max: ${trip.maxGuests})`} className='mt-4' />

            <div className="flex justify-between mt-3">
                <p className='font-medium text-sm text-primaryDarker'>Total</p>
                <p className='font-medium text-sm text-primaryDarker'>R$2500</p>
            </div>

            <Button className='mt-3 w-full'>Reservar Agora</Button>

<div className="pb-10 border-b border-b-grayLighter w-full"></div>

        </div>
    )
}


export default TripReservation;