import React, { useState } from 'react';
import { MdFoodBank } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import SearchBar from './SearchBar';
import Button from './Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='shadow-md w-full z-10 fixed top-0 left-0 border-b-2 border-[#3a5a40]'>
      <div className='md:flex items-center justify-between bg-[#aaf683] md:px-10 px-7 md:py-3 relative'>
        <div className='text-[#4c956c] font-title text-3xl font-bold cursor-pointer flex items-center'>
          <span className='text-[#3a5a40] mr-1 text-center items-center'>
            <MdFoodBank className='text-5xl mb-2' />
          </span>
          <Link to='/'>Green<span className='text-[#ee6055]'>Eats</span></Link>
        </div>
        <div
          className='text-3xl absolute right-8 top-3 cursor-pointer md:hidden'
          onClick={() => setOpen(!open)}
        >
          {open ? <AiOutlineClose /> : <FiMenu />}
        </div>
        <SearchBar display='hidden md:flex'/>
        <div className='hidden md:flex gap-2'>
          <Button name='Favorites' to='/favorites' />
          <Button name='Meal Planner' to='/mealplanner' />
        </div>
        {open && (
          <ul className={`flex items-center justify-center md:opacity-100 md:pb-0 bg-[#aaf683] md:pt-0 pb-12 pt-2 gap-2 absolute md:static md:z-auto left-0 w-full md:w-auto transition-opacity duration-300 ease-in`}>
            <li className='text-xl'>
              <Button name='Favorites' to='/favorites' />
            </li>
            <li className='text-xl'>
              <Button name='Meal Planner' to='/mealplanner' />
            </li>
            <li className='text-xl mt-20 flex-col'>
              <SearchBar display='flex md:hidden'/>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
