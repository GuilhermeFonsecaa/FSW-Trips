"use client"

import React from "react";
import Input from '@/Components/Input'
import DatePicker from "@/Components/DatePicker";
import CurrencyInput from "@/Components/CurrencyInput";
import Button from "@/Components/Button"

const TripSearch = () => {
    return (
        <div className="container mx-auto p-5 bg-search-background bg-cover bg-no-repeat bg-center">
            <h1 className="font-semilbold text-2xl text-primaryDarker text-center">Encontre sua próxima <span className="text-primary">viagem!</span></h1>

            <div className="flex flex-col gap-4 mt-5">
                <Input placeholder="Qual o seu destino?" />

                <div className="flex gap-4">
                    <DatePicker className="w-full" onChange={() => { }} />
                    <CurrencyInput />
                </div>

                <Button variant="primary">Buscar</Button>
            </div>
        </div>
    )
}

export default TripSearch;