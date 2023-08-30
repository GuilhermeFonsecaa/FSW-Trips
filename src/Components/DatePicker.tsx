import { LegacyRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import DatePicker, {
    ReactDatePickerProps,
    registerLocale,
} from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

interface InputProps extends ReactDatePickerProps {
    error?: boolean;
    errorMessage?: string;
}

function Input(
    { className, error, errorMessage, ...props }: InputProps,
    ref: LegacyRef<HTMLInputElement> | undefined
) {
    const inputClassName = twMerge(
        "rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-dark placeholder-black placeholder-opacity-20 outline-none transition-all focus:ring-1 focus:ring-primary",
        error ? "border-red-500" : "",
        className
    );

    return (
        <div className="flex w-full flex-col">
            <DatePicker
                locale="pt-BR"
                wrapperClassName="w-full"
                className={inputClassName}
                dateFormat='dd/MM/yyyy'
                enableTabLoop={false}
                placeholderText="Primeira Data"
                {...props}
            />
            {error && errorMessage && (
                <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
            )}
        </div>
    );
}

export default forwardRef(Input);