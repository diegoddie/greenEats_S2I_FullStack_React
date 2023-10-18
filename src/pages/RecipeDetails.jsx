import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { faClock, faUtensils, faScaleBalanced, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DetailLabel from '../components/DetailLabel';
import { Switch, Spinner } from "@material-tailwind/react";
import _ from 'lodash';

const RecipeDetails = () => {
  const { recipeId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = 'https://api.spoonacular.com';

  // Fetches details of the specified recipe.
  const getRecipeDetails = async () => {
    try {
      console.log(recipeId)
      setIsLoading(true)
      console.log(recipeId)
      const storedRecipes = localStorage.getItem(`recipeDetails-${recipeId}`);
      if (storedRecipes) {
        const parsedRecipeDetails = JSON.parse(storedRecipes);
        setRecipeDetails(parsedRecipeDetails);
        setIsLoading(false)
      } else {
        const response = await axios.get(
          `${BASE_URL}/recipes/${recipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=true`,
        );
        const data = response.data;
        console.log(data);
  
        const title = _.get(data, 'title', '');
        const image = _.get(data, 'image', '');
        const servings = _.get(data, 'servings', 0);
        const readyInMinutes = _.get(data, 'readyInMinutes', 0);
        const nutrition = _.get(data, 'nutrition', {});
        const diets = _.get(data, 'diets', []);
        const ingredients = _.get(data, 'extendedIngredients', []);
        const instructions = _.get(data, 'analyzedInstructions', []);
        const summary = _.get(data, 'summary', '');
  
        const recipeDetails = {
          title,
          image,
          servings,
          readyInMinutes,
          nutrition,
          diets,
          extendedIngredients: ingredients,
          instructions,
          summary,
        };
  
        setRecipeDetails(recipeDetails);
        console.log(recipeDetails)
        localStorage.setItem(`recipeDetails-${recipeId}`, JSON.stringify(recipeDetails));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('An error occurred in the API call for recipes details:', error);
      setIsLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  // Toggles the display of recipe instructions.
  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  useEffect(() => {
    getRecipeDetails();
  }, [recipeId]);

  return (
    <div className="p-4 mt-14 min-h-screen">
      {isLoading ? (
        <div className="text-center flex items-center justify-center mt-20">
          <Spinner className="h-12 w-12" color='red'/> 
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-bold mt-20">{error}</div>
      ) : (recipeDetails ? (    
      <div className="max-w-screen-lg h-full mx-auto bg-white rounded-lg shadow-md p-5 mt-6">
        <div className="w-full justify-between flex mb-3">
          <Link to="/" className="flex items-center text-black mb-4">
            <FontAwesomeIcon icon={faArrowLeft} className='text-black text-2xl' />
            <span className="ml-2 text-black font-bold">BACK</span>
          </Link>
          <div className="flex items-center mb-4">
            <span className="text-black font-bold mr-3">INSTRUCTIONS</span>
            <Switch name="instructionsSwitch" className='w-9' onChange={toggleInstructions}/>
          </div>
        </div>
        <h2 className="text-2xl md:text-5xl font-bold mb-1 md:mb-2 font-subtitle text-black">{recipeDetails.title}</h2>
        <div className="border-b border-gray-400 mb-4"></div>
        {showInstructions ? (
          <div>
            <h3 className='font-bold text-xl md:text-2xl pb-2 text-black'>Instructions:</h3>
            <ol className='text-md md:text-lg text-black'>
              {recipeDetails.instructions[0].steps.map((step, index) => (
                <li key={index}>
                  <span className="mr-2 font-bold">{index + 1}.</span> {step.step}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row mt-6">
              <img src={recipeDetails.image} alt={recipeDetails.title} className="w-full " />
              <div className='mt-4 md:mt-0 md:p-2 md:ml-6'>
                <div className='flex flex-row justify-center gap-4 mx-auto pb-5'>
                  <div className='flex flex-col items-center space-y-2 bg-[#3a5a40] rounded-full justify-center w-20 h-20 md:w-24 md:h-24'>
                    <FontAwesomeIcon icon={faUtensils} className='text-[#959292] text-xl md:text-2xl' />
                    <h1 className='text-white text-sm md:text-lg font-semibold'>{recipeDetails.servings}</h1>
                  </div>
                  <div className='flex flex-col items-center space-y-2 bg-[#3a5a40] rounded-full justify-center w-20 h-20 md:w-24 md:h-24'>
                    <FontAwesomeIcon icon={faClock} className='text-white text-xl md:text-2xl' />
                    <h1 className='text-white text-sm md:text-lg font-semibold'>{recipeDetails.readyInMinutes} Min</h1>            
                  </div>
                  <div className='flex flex-col items-center space-y-2 bg-[#3a5a40] rounded-full justify-center w-20 h-20 md:w-24 md:h-24'>
                    <FontAwesomeIcon icon={faScaleBalanced} className='text-[#e69c64] text-xl md:text-2xl' />
                    <h1 className='text-white text-sm md:text-lg font-semibold'>{Math.round(recipeDetails.nutrition.nutrients[0].amount)} Kcal</h1>
                  </div>
                </div>
                <h3 className='font-bold text-xl md:text-2xl pb-2 text-black'>Diets:</h3>
                <div className="flex flex-row flex-wrap text-white text-sm">
                  {recipeDetails.diets.map((diet, index) => (
                    <DetailLabel key={index} label={diet} color="#D9841D" />
                  ))}
                </div>
                <h3 className='font-bold text-xl md:text-2xl pt-6 pb-2 text-black'>Ingredients:</h3>
                <ul className='flex flex-row flex-wrap text-white text-sm'>
                  {recipeDetails.extendedIngredients && (
                    [...new Set(recipeDetails.extendedIngredients.map(ingredient => ingredient.nameClean))]
                      .map((cleanName, index) => (
                        <li key={index}><DetailLabel label={cleanName} color="#328120" /></li>
                      ))
                  )}
                </ul>
              </div>
            </div>
            <div className='mt-2 w-full'>
              <h3 className='font-bold text-xl md:text-2xl pt-6 pb-2 text-black'>Summary:</h3>
              <p className="text-md md:text-lg text-black" dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}></p>
            </div>
          </div>
        )}
      </div>
      ) : null)}
    </div>
  );
};

export default RecipeDetails;
