import React, { useState, useEffect } from 'react';
import Button from './Button';
import { AiTwotoneHeart } from 'react-icons/ai';

// The RecipeCard component displays a recipe card with an image, title, and favorite button.
const RecipeCard = ({ image, title, recipeId }) => {
  // State to track whether the recipe is marked as a favorite.
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the recipe is a favorite when the component mounts.
  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || {};
    setIsFavorite(favoriteRecipes[recipeId] ? true : false);
  }, [recipeId]);

  // Maximum length for recipe title, and check if it needs truncation.
  const maxTitleLength = 50;
  const isTitleTooLong = title.length > maxTitleLength;
  const trimmedTitle = isTitleTooLong ? title.slice(0, maxTitleLength) + '...' : title;

  // Handle clicking the favorite button to toggle the favorite status.
  const handleFavoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || {};
    if (favoriteRecipes[recipeId]) {
      delete favoriteRecipes[recipeId];
    } else {
      favoriteRecipes[recipeId] = { title, image };
    }

    setIsFavorite(!isFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  return (
    <div className="relative w-full h-[400px] md:w-[400px] md:h-[420px] rounded-lg overflow-hidden shadow-lg bg-[#8ccf6b] transition-transform hover:scale-105">
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-lg  text-center text-black">{trimmedTitle}</div>
      </div>
      <div className="absolute bottom-1 left-2 right-2 p-2 gap-3 flex justify-center">
        <Button name="Recipe Details" to={`/recipe/${recipeId}`} />
        <button onClick={handleFavoriteClick}>
          <AiTwotoneHeart
            size={32}
            style={{ color: isFavorite ? 'red' : 'white' }}
            className="cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
