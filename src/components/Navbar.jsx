import { IconButton } from '@mui/material';
import React from 'react'
import { TbSquareRoundedChevronDownFilled as DownIcon } from "react-icons/tb";

const Navbar = () => {
  return (
    <div className='bg-[#050514] backdrop-filter backdrop-blur-lg bg-opacity-50 border-b border-gray-900 flex justify-between items-center w-full sticky top-0 z-50 h-16 p-5'>
        <div className='font-bold text-4xl'>🍨</div>
        <div className='inline-flex items-center gap-x-2'>
            <div className='w-32 text-right text-sm'>Hello, You</div>
            <IconButton>
              <DownIcon size={24} color='blue'/>
            </IconButton>
        </div>
    </div>
  )
}

export default Navbar