'use client'

import React from 'react'
import DatePicker from '@/Components/DatePicker';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import { useForm, Controller } from 'react-hook-form';
import { differenceInDays } from 'date-fns/esm';
import { useRouter } from 'next/navigation'

interface TripReservationProps {
    tripId: string;
    maxGuests: number;
    tripStartDate: Date;
    tripEndDate: Date;
    pricePerDay: number;
}

interface TripReservationForm {
    startDate: Date | null;
    endDate: Date | null;
    guests: number;
}

const TripReservation = ({ tripId, maxGuests, tripStartDate, tripEndDate, pricePerDay }: TripReservationProps) => {
    const { register, handleSubmit, formState: { errors }, control, watch, setError } = useForm<TripReservationForm>();
    const router = useRouter();

    const onSubmit = async (data: TripReservationForm) => {
        const response = await fetch("/api/trips/check", {
            method: "POST",
            body: Buffer.from(JSON.stringify({
                startDate: data.startDate,
                endDate: data.endDate,
                tripId,
            })
            ),
        });

        const res = await response.json();

        if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
            setError("startDate", {
                type: "manual",
                message: "Esta data já está reservada",
            })

            return setError("endDate", {
                type: "manual",
                message: "Esta data já está reservada",
            })
        }

        if (res?.error?.code === "INVALID_START_DATE") {
            return setError("startDate", {
                type: "manual",
                message: "Data Inválida",
            })
        }

        if (res?.error?.code === "INVALID_END_DATE") {
            return setError("endDate", {
                type: "manual",
                message: "Data Inválida",
            })
        }

        router.push(`/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${data.guests}`)

    };

    const startDate = watch("startDate")
    const endDate = watch("endDate")

    return (
        <div className="flex flex-col px-5 lg:min-w-[380px] lg:p-5 lg:border-grayLighter lg:border lg:rounded-lg lg:shadow-md">
            <p className='text-xl hidden text-primaryDarker mb-4 lg:block'>
                <span className='font-semibold'>R${pricePerDay} por dia</span>
            </p>
            <div className='flex gap-4'>
                <Controller
                    name="startDate"
                    rules={{
                        required: {
                            value: true,
                            message: 'Data de Ínicio é obrigatória.',
                        },
                    }}
                    control={control}
                    render={({ field }) => <DatePicker error={!!errors?.startDate} errorMessage={errors.startDate?.message} onChange={field.onChange} selected={field.value} minDate={tripStartDate} maxDate={endDate ?? tripEndDate} className='w-full' placeholderText='Data de Ínicio' />}
                />

                <Controller
                    name="endDate"
                    rules={{
                        required: {
                            value: true,
                            message: 'Data Final é obrigatória.',
                        },
                    }}
                    control={control}
                    render={({ field }) => <DatePicker error={!!errors?.endDate} errorMessage={errors.endDate?.message} onChange={field.onChange} selected={field.value} minDate={startDate ?? tripStartDate} maxDate={tripEndDate} className='w-full' placeholderText='Data Final' />}
                />
            </div>

            <Input
                {...register('guests',
                    {
                        required: {
                            value: true,
                            message: 'Número de hóspedes é obrigatório'
                        },
                        max: {
                            value: maxGuests,
                            message: `Número de hóspedes não pode ser maior que ${maxGuests}`,
                        }
                    })}

                error={!!errors?.guests}
                errorMessage={errors?.guests?.message}
                placeholder={`Número máximo de hóspedes (max: ${maxGuests})`}
                className='mt-4'
                type='number' />

            <div className="flex justify-between mt-3">
                <p className='font-medium text-sm text-primaryDarker'>Total</p>
                <p className='font-medium text-sm text-primaryDarker'>{startDate && endDate ? `R$${differenceInDays(endDate, startDate) * pricePerDay}` : "R$0"}</p>
            </div>

            <Button onClick={() => handleSubmit(onSubmit)()} variant='primary' className='mt-3 w-full'>Reservar Agora</Button>

            <div className="pb-10 border-b border-b-grayLighter w-full lg:border-none lg:pb-0"></div>

        </div>
    )
}


export default TripReservation;