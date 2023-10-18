import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import RecipeCard from '../components/RecipeCard';
import { Spinner } from '@material-tailwind/react';

// RecipeSearch component displays search results for a given query.
const RecipeSearch = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = 'https://api.spoonacular.com';

    // Fetch and display recipes based on the search query.
    const handleSearch = async () =>{
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `${BASE_URL}/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&diet=vegetarian&query=${query}&number=8`
            );

            const data = response.data;
            const recipes = _.get(data, 'results', {});

            setSearchResults(recipes);
        } catch (error) {
            console.error('An error occurred while fetching the recipes.', error);
            setIsLoading(false);
            setError('An error occurred while fetching the recipes.');
        }

        setIsLoading(false);
    };

    useEffect(() => {
        handleSearch();
    }, [query]);

    return (
        <div className="mt-12 md:mt-20 min-h-screen w-full">
            <h1 className='text-center font-subtitle pt-6 pb-2 md:pb-1 text-3xl md:text-5xl font-bold text-[#3a5a40]'>Results for "{query}"</h1>
            {isLoading ? (
                <div className="text-center flex items-center justify-center mt-4">
                    <Spinner className="h-12 w-12" color='red'/>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 font-bold flex items-center justify-center mt-20">{error}</div>
            ) : (Object.keys(searchResults).length === 0 ? (
                <h1 className='text-center font-subtitle pt-6 pb-2 md:pb-1 text-3xl md:text-4xl font-bold text-[#3a5a40]'>No Recipes Found</h1>
            ) : (
                <div>
                    <div className='flex justify-center md:mt-6 space-x-6 md:space-x-8 items-center'>
                        <div className="flex flex-wrap justify-center py-2 md:py-6 p-2">
                            {Object.keys(searchResults).map((recipeId, index) => (
                                <div key={index} className="p-2">
                                    <RecipeCard
                                        image={searchResults[recipeId].image}
                                        title={searchResults[recipeId].title}
                                        recipeId={recipeId}
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

export default RecipeSearch;
