import React from 'react';
import IconsSearch from '@/Components/IconsSearch';
import Link from 'next/link';

const QuickSearch = () => {
    return (
        <div className='container mx-auto p-5'>
            <div className="flex items-center">
                <div className="w-full h-[1px] bg-graySecondary"></div>
                <h2 className='px-5 font-medium text-grayPrimary whitespace-nowrap'>Tente pesquisar por</h2>
                <div className="w-full h-[1px] bg-graySecondary"></div>
            </div>

            <div className="flex w-full justify-between mt-5">
                <Link href={`trips/search?destiny=hotel`}>
                    <IconsSearch src={"/hotel-icon.png"} title='Hotel' />
                </Link>
                <Link href={`trips/search?destiny=chalé`}>
                    <IconsSearch src={"/cottage-icon.png"} title='Chalés' />
                </Link>
                <Link href={`trips/search?destiny=pousada`}>
                    <IconsSearch src={"/inn-icon.png"} title='Pousadas' />
                </Link>
                <Link href={`trips/search?destiny=fazenda`}>
                    <IconsSearch src={"/farm-icon.png"} title='Fazendas' />
                </Link>
            </div>

        </div>
    )
}

export default QuickSearch;