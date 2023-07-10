import React from 'react';
import IconsSearch from '@/Components/IconsSearch';

const QuickSearch = () => {
    return (
        <div className='container mx-aut p-5'>
            <div className="flex items-center">
                <div className="w-full h-[1px] bg-graySecondary"></div>
                <h2 className='px-5 font-medium text-grayPrimary whitespace-nowrap'>Tente pesquisar por</h2>
                <div className="w-full h-[1px] bg-graySecondary"></div>
            </div>

            <div className="flex w-full justify-between mt-5">
                <IconsSearch src={"/hotel-icon.png"} title='Hotel' />
                <IconsSearch src={"/cottage-icon.png"} title='Chalés' />
                <IconsSearch src={"/inn-icon.png"} title='Pousadas' />
                <IconsSearch src={"/farm-icon.png"} title='Fazendas' />
            </div>

        </div>
    )
}

export default QuickSearch;