"use client"

import React from "react";
import Input from '@/Components/Input'
import DatePicker from "@/Components/DatePicker";
import CurrencyInput from "@/Components/CurrencyInput";
import Button from "@/Components/Button"
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";


interface TripSearchForm {
    destiny: string;
    startDate: Date | null;
    budget: string;
}

const TripSearch = () => {

    const  router  = useRouter()

    const { control, register, handleSubmit, formState: { errors } } = useForm<TripSearchForm>()

    const onSubmit = (data: TripSearchForm) => {
        router.push(`/trips/search?destiny=${data.destiny}&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`)
        console.log({ data })
    }

    return (
        <div className="container mx-auto p-5 bg-search-background bg-cover bg-no-repeat bg-center">
            <h1 className="font-semilbold text-2xl text-primaryDarker text-center">Encontre sua próxima <span className="text-primary">viagem!</span></h1>

            <div className="flex flex-col gap-4 mt-5">
                <Input placeholder="Qual o seu destino?"
                    error={!!errors.destiny}
                    errorMessage={errors.destiny?.message}
                    {...register("destiny", {
                        required: {
                            value: true,
                            message: "Destino é obrigatório",
                        }
                    }
                    )} />

                <div className="flex gap-4">
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => <DatePicker
                            onChange={field.onChange}
                            selected={field.value}
                            minDate={new Date()}
                            className='w-full' placeholderText='Data Inicial' />}
                    />

                    <Controller
                        name="budget"
                        control={control}
                        render={({ field }) => <CurrencyInput allowDecimals={false} onValueChange={field.onChange as any} value={field.value} onBlur={field.onBlur} />}
                    />

                </div>

                <Button onClick={() => handleSubmit(onSubmit)()} variant="primary">Buscar</Button>
            </div>
        </div >
    )
}

export default TripSearch;