import React, { useState, useEffect } from 'react';
import { Spinner } from "@material-tailwind/react";
import _ from 'lodash';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

// MealPlanner component displays a user's daily meal plan.
const MealPlanner = () => {
    const [targetCalories, setTargetCalories] = useState(2000);
    const [diet, setDiet] = useState('vegetarian');
    const [exclude, setExclude] = useState('');
    const [mealPlan, setMealPlan] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const BASE_URL = 'https://api.spoonacular.com';

    // Handles generating a daily meal plan.
    const handleGenerateMealPlan = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const storedMealPlan = localStorage.getItem('mealPlan');
          if (storedMealPlan) {
                const parsedMealPlan = JSON.parse(storedMealPlan);
                setMealPlan(parsedMealPlan);
                setIsLoading(false);
          } else {
            const response = await axios.get(
              `${BASE_URL}/mealplanner/generate?apiKey=${process.env.REACT_APP_API_KEY}&timeFrame=day&targetCalories=${targetCalories}&diet=${diet}&exclude=${exclude}`
            );
      
            const data = response.data;
            const recipes = _.get(data, 'meals', {});
      
            const recipeIds = recipes.map((recipe) => recipe.id);
            const generatedRecipes = await fetchRecipesById(recipeIds);
      
            setMealPlan(generatedRecipes);
            localStorage.setItem('mealPlan', JSON.stringify(generatedRecipes));
            setIsLoading(false)
          }
        } catch (error) {
          console.error('An error occurred while generating the daily meal plan.', error);
          setIsLoading(false);
          setError('An error occurred while generating the meal plan.');
        }
    };

    // Fetches recipes by their IDs.
    const fetchRecipesById = async (recipeIds) => {
        const recipes = [];

        for (const recipeId of recipeIds) {
            const recipeResponse = await axios.get(
                `${BASE_URL}/recipes/${recipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=true`,
            );
            const data = recipeResponse.data;

            const id = _.get(data, 'id', '');
            const title = _.get(data, 'title', '');
            const image = _.get(data, 'image', '');

            recipes.push({ title, image, id });
        }

        return recipes;
    };

    // Handles generating a new meal plan.
    const handleNewMealPlan = () => {
        localStorage.removeItem('mealPlan');
        setMealPlan({});
    };

    useEffect(() => {
        const savedMealPlan = localStorage.getItem('mealPlan');
        if (savedMealPlan) {
            setMealPlan(JSON.parse(savedMealPlan));
        }
    }, []);

    return (
        <div className='mt-12 md:mt-20 min-h-screen w-full'>
            <h1 className='text-center font-subtitle pt-6 pb-2 md:pb-1 text-3xl md:text-5xl font-bold text-[#3a5a40]'>Meal Planner</h1>
            {isLoading ? (
                <div className="text-center flex items-center justify-center mt-4">
                    <Spinner className="h-12 w-12" color='red'/>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 font-bold flex items-center justify-center mt-20">{error}</div>
            ) : (Object.keys(mealPlan).length === 0 ? (
                <>
                    <h3 className='text-center font-subtitle pt-2 pb-2 md:pb-1 text-2xl md:text-2xl font-semibold text-[#3a5a40]'>Generate your own custom meal plan!</h3>
                    <div className="w-fit h-full mx-auto bg-white rounded-lg shadow-md p-5 mt-6">
                        <form>
                            <div className="flex flex-col gap-3 justify-center">
                                <div className="flex flex-col md:flex-row items-center">
                                    <span className="text-lg font-bold mr-2">Target Calories:</span>
                                    <input type="number" value={targetCalories} onChange={(e) => setTargetCalories(e.target.value)} className="border border-black rounded p-2" />
                                </div>

                                <div className="flex flex-col md:flex-row items-center">
                                    <span className="text-lg font-bold mr-2">Diet:</span>
                                    <select value={diet} onChange={(e) => setDiet(e.target.value)} className="border border-black rounded p-2">
                                        <option value="Gluten Free">Gluten Free</option>
                                        <option value="Vegetarian">Vegetarian</option>
                                        <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                                        <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                                        <option value="Vegan">Vegan</option>
                                    </select>
                                </div>

                                <div className="flex flex-col md:flex-row items-center">
                                    <span className="text-lg font-bold mr-4">Exclude Ingredients:</span>
                                    <input type="text" value={exclude} onChange={(e) => setExclude(e.target.value)} className="border border-black rounded p-2" />
                                </div>

                                <button type="button" onClick={handleGenerateMealPlan} className="bg-[#3a5a40] text-white py-2 rounded hover:bg-green-600">
                                    Generate Meal Plan
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <div>
                    <h3 className='text-center font-subtitle pt-2 pb-2 md:pb-4 text-2xl md:text-3xl font-semibold text-[#3a5a40]'>Here's your {diet} Meal Plan - {targetCalories}Kcal </h3>
                    <div className="text-center"> 
                        <button type="button" onClick={handleNewMealPlan} className="py-2 px-2 rounded-lg bg-[#29754b] text-white font-bold hover:bg-[#155833] duration-300">
                            Generate a New Meal Plan
                        </button>
                    </div>
                    <div className='flex justify-center md:mt-6 space-x-6 md:space-x-8 items-center'>
                        <div className="flex flex-wrap justify-center py-2 md:py-6 p-2">
                            {Object.keys(mealPlan).map((recipeId, index) => (
                                <div key={index} className="p-2">
                                    <RecipeCard
                                        image={mealPlan[recipeId].image}
                                        title={mealPlan[recipeId].title}
                                        recipeId={mealPlan[recipeId].id}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MealPlanner;
