import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeDetails from "./pages/RecipeDetails";
import Footer from "./components/Footer";
import Favorites from "./pages/Favorites";
import MealPlanner from "./pages/MealPlanner";
import RecipeSearch from "./pages/RecipeSearch";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App font-body bg-[#c7f9cc]">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/mealplanner" element={<MealPlanner />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          <Route path="/searched/:query" element={<RecipeSearch />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
