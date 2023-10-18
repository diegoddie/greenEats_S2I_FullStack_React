import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

// The Favorites component displays the user's favorite recipes.
const Favorites = () => {
  // State to store favorite recipes.
  const [favoriteRecipes, setFavoriteRecipes] = useState({});

  // Use useEffect to load favorite recipes from local storage.
  useEffect(() => {
    const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || {};
    setFavoriteRecipes(storedFavoriteRecipes);
  }, []); 

  return (
    <div className="mt-12 md:mt-20 min-h-screen w-full">
      {Object.keys(favoriteRecipes).length === 0 ? (
        <h1 className='text-center font-subtitle pt-6 pb-2 md:pb-1 text-3xl md:text-4xl font-bold text-[#3a5a40]'>No Favorite Recipes</h1>
      ) : (
        <div>
          <h1 className='text-center font-subtitle pt-6 pb-2 md:pb-1 text-3xl md:text-4xl font-bold text-[#3a5a40]'>Your Favorite Recipes</h1>
          <div className='flex justify-center md:mt-6 space-x-6 md:space-x-8 items-center'>
            <div className="flex flex-wrap justify-center py-2 md:py-6 p-2">
              {Object.keys(favoriteRecipes).map((recipeId, index) => (
                <div key={index} className="p-2">
                  <RecipeCard
                    image={favoriteRecipes[recipeId].image}
                    title={favoriteRecipes[recipeId].title}
                    recipeId={recipeId}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;
