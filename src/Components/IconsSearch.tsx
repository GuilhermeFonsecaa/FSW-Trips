import React from "react";
import Image from 'next/image';

interface IconsSearchProps {
    src: string
    title: string
}


const IconsSearch = ({ ...props }: IconsSearchProps) => {
    return (
        <div className=" flex flex-col items-center gap-1">
            <Image width={35} height={35} src={props.src} alt={props.title} />
            <p className='lg:text-base text-sm text-grayPrimary'>{props.title}</p>
        </div>
    )
}

export default IconsSearch;