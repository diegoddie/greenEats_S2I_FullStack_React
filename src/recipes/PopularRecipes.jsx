import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';
import { Spinner } from "@material-tailwind/react";
import _ from 'lodash';

// PopularRecipes component displays a list of popular vegetarian recipes.
const PopularRecipes = () => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = 'https://api.spoonacular.com';

  // Fetch popular vegetarian recipes from the API.
  const getPopularRecipes = async () => {
    try {
      const storedRecipes = localStorage.getItem('popularRecipes');
      
      if (storedRecipes) {
        const parsedRecipes = JSON.parse(storedRecipes);
        setPopularRecipes(parsedRecipes);
        setIsLoading(false);
      } else {
        const response = await axios.get(
          `${BASE_URL}/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8&tags=vegetarian`,
        );
        const data = response.data;

        const recipes = _.get(data, 'recipes', []); 
        setPopularRecipes(recipes);
        localStorage.setItem('popularRecipes', JSON.stringify(recipes));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('An error occurred in the API call for popular recipes:', error);
      setIsLoading(false);
      setError('An error occurred. Please try again later.');
    } 
  };

  useEffect(() => {
    getPopularRecipes();
  }, []);

  return (
    <div className="flex flex-wrap justify-center py-2 md:py-6 p-2">
      {isLoading ? (
        <div className="text-center flex items-center justify-center mt-4">
          <Spinner className="h-12 w-12" color='red'/> 
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-bold mt-20">{error}</div>
      ) : (
        <>
          {popularRecipes && popularRecipes.map((recipe, index) => (
          <div key={index} className="p-2">
            <RecipeCard
              image={recipe.image}        
              title={recipe.title}
              recipeId={recipe.id}
            />
          </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PopularRecipes;
