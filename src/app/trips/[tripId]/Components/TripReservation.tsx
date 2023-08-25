'use client'

import React from 'react'
import DatePicker from '@/Components/DatePicker';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import { useForm, Controller } from 'react-hook-form';

interface TripReservationProps {
    maxGuests: number;
    tripStartDate: Date;
    tripEndDate: Date;
}

interface TripReservationForm {
    guests: number;
    startDate: Date | null;
    endDate: Date | null;
}

const TripReservation = ({ maxGuests, tripStartDate, tripEndDate }: TripReservationProps) => {
    const { register, handleSubmit, formState: { errors }, control, watch} = useForm<TripReservationForm>();
    const onSubmit = (data: any) => {
        console.log({ data })
    };

    const startDate = watch("startDate")

    return (
        <div className="flex flex-col px-5">
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
                    render={({ field }) => <DatePicker error={!!errors?.startDate} errorMessage={errors.startDate?.message} onChange={field.onChange} selected={field.value} minDate={tripStartDate} className='w-full' placeholderText='Data de Ínicio' />}
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
                    })}

                error={!!errors?.guests}
                errorMessage={errors?.guests?.message}
                placeholder={`Número máximo de hóspedes (max: ${maxGuests})`} className='mt-4' />

            <div className="flex justify-between mt-3">
                <p className='font-medium text-sm text-primaryDarker'>Total</p>
                <p className='font-medium text-sm text-primaryDarker'>R$2500</p>
            </div>

            <Button onClick={() => handleSubmit(onSubmit)()} variant='primary' className='mt-3 w-full'>Reservar Agora</Button>

            <div className="pb-10 border-b border-b-grayLighter w-full"></div>

        </div>
    )
}


export default TripReservation;