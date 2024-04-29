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
        <div className="container mx-auto p-5 bg-search-background bg-cover bg-no-repeat bg-center lg:py-28">
            <h1 className="font-semilbold text-2xl text-primaryDarker text-center lg:text-[2.5rem]">Encontre sua próxima <span className="text-primary">viagem!</span></h1>

            <div className="lg:mt-12 flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[948px] lg:mx-auto lg:p-4 lg:bg-primary lg:bg-opacity-20 lg:rounded-lg">
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

                <div className="flex gap-4 lg:w-full">
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

                <Button onClick={() => handleSubmit(onSubmit)()} className="w-1/2 lg:h-fit bg-primary text-white hover:bg-primaryDarker">Buscar</Button>
            </div>
        </div >
    )
}

export default TripSearch;