import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';
import { Spinner } from "@material-tailwind/react";
import _ from 'lodash';

// WheatRecipes component displays a list of vegetarian recipes with wheat-based ingredients.
const WheatRecipes = () => {
    const [wheatRecipes, setWheatRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = 'https://api.spoonacular.com';

    // Fetch wheat-based vegetarian recipes from the API.
    const getWheatRecipes = async() => {
        try {
            const storedRecipes = localStorage.getItem('wheatRecipes');
            
            if (storedRecipes) {
                const parsedRecipes = JSON.parse(storedRecipes);
                setWheatRecipes(parsedRecipes);
                setIsLoading(false);
            } else {
                const response = await axios.get(
                    `${BASE_URL}/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=6&diet=vegetarian&includeIngredients=wheat`,              
                );
                const data = response.data;

                const recipes = _.get(data, 'results', []);
                setWheatRecipes(recipes);
                localStorage.setItem('wheatRecipes', JSON.stringify(recipes));
                setIsLoading(false);
            }
        } catch (error) {
            console.error('An error occurred in the API call for wheat-based recipes:', error);
            setIsLoading(false);
            setError('An error occurred. Please try again later.');
        }
    }

    useEffect(() => {
        getWheatRecipes();
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
                    {wheatRecipes && wheatRecipes.map((recipe, index) => (
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
    )
}

export default WheatRecipes;
