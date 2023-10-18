import React, { useState } from 'react';
import Carousel from '../components/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEgg, faFire, faWheatAwn, faIceCream } from '@fortawesome/free-solid-svg-icons';
import PopularRecipes from '../recipes/PopularRecipes';
import WheatRecipes from '../recipes/WheatRecipes';
import EggRecipes from '../recipes/EggRecipes';
import DessertRecipes from '../recipes/DessertRecipes';

// Categories of recipes displayed on the home page.
const categories = [
  { icon: faFire, title: "Popular Recipes", component: <PopularRecipes /> },
  { icon: faWheatAwn, title: "Wheat-Based", component: <WheatRecipes /> },
  { icon: faEgg, title: "Egg-Based Recipes", component: <EggRecipes /> },
  { icon: faIceCream, title: "Desserts", component: <DessertRecipes /> },
];

// The Home component displays the main content of the home page.
const Home = () => {
  // State to track the active category index.
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className='mt-12 md:mt-20 h-full w-full'>
      <h1 className='text-center font-subtitle pt-6 pb-2 md:pb-1 text-3xl md:text-4xl font-bold text-[#3a5a40]'>
        Sustainable <span className='text-[#ee6055]'>Living</span> , Flavorful <span className='text-[#ee6055]'>Eating</span> : Your Vegetarian Oasis
      </h1>
      <Carousel />
      <div className='flex justify-center mt-6 space-x-6 md:space-x-8 items-center'>
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => setActiveCategory(index)}
            className='text-center cursor-pointer'
          >
            <div className={`w-12 h-12 md:w-16 md:h-16 ${activeCategory === index ? 'bg-[#f4a259]' : 'bg-gray-400'} rounded-full flex flex-col items-center justify-center mb-2`}>
              <FontAwesomeIcon icon={category.icon} className='text-2xl text-white' />
            </div>
          </div>
        ))}
      </div>
      {categories[activeCategory] && (
        <>
          <h1 className="text-center font-subtitle pt-2 md:pt-4 text-3xl md:text-5xl font-bold text-[#3a5a40]">
            {categories[activeCategory].title}
          </h1>
          {categories[activeCategory].component}
        </>
      )}
    </div>
  );
};

export default Home;
