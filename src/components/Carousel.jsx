import React, { useState } from 'react';
import asiatic from '../images/asiatic.jpg';
import italian from '../images/italian.jpg';
import japanese from '../images/japanese.jpg';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Button from './Button';

// The Carousel component displays a rotating carousel of images
const Carousel = () => {
  // Define carousel items with images and buttons.
  const items = [
    {
      image: asiatic,
      button: <Button name="Explore Thai Food" to="/searched/thai" />,
    },
    {
      image: italian,
      button: <Button name="Explore Italian Food" to="/searched/italian" />,
    },
    {
      image: japanese,
      button: <Button name="Explore Japanese Food" to="/searched/japanese" />,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className='h-[300px] md:h-[500px] w-full md:w-[90%] m-auto md:py-4 relative group'>
      <div className='relative w-full h-full md:rounded-xl overflow-hidden'>
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.image}
              alt={`Slide ${index}`}
              className='w-full h-full object-cover object-center'
            />
            <div className='absolute inset-0 bg-black opacity-70'></div>
          </div>
        ))}
        <div className='w-full absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-semibold text-center'>
          {items[currentIndex].button}
        </div>
      </div>
      <div
        onClick={prevSlide}
        className='hidden md:flex group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
      >
        <BsChevronCompactLeft size={30} />
      </div>
      <div
        onClick={nextSlide}
        className='hidden md:flex group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
      >
        <BsChevronCompactRight size={30} />
      </div>
    </div>
  );
};

export default Carousel;
