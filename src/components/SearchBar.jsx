import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

// The SearchBar component displays a search input field.
const SearchBar = ({ display }) => {
  // State to track the input value.
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  // Handle input change when the user types in the search field.
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submission when the user searches.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      // Format the input and navigate to the search results page.
      const formattedInput = input.replace(/ /g, '-');
      navigate(`/searched/${formattedInput}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`items-center absolute left-1/2 -translate-x-1/2 w-full lg:max-w-xl md:max-w-sm rounded-full py-1 px-4 ${display}`}>
      <input
        type='text'
        value={input}
        onChange={handleInputChange}
        placeholder='Search for recipes or ingredients...'
        className='rounded-full py-1 px-4 text-sm md:text-xl focus:outline-none w-full border border-black bg-white'
      />
      <button
        type='submit'
        className='text-3xl text-[#3a5a40] font-bold hover:text-[#29754b] duration-500 mr-3'
      >
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default SearchBar;
