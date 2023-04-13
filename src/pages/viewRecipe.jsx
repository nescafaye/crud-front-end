import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import Loader from "../components/Loader";

const API_BASE_URL = "http://localhost:3000/recipes";

const ViewRecipe = () => {
  const { slug } = useParams();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${slug}`);
        console.log(response.data);
        setSelectedRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [slug]);

  return (
    <div className="bg-[#040410] text-white h-screen">
      {selectedRecipe ? (
        <div>
          <div>{selectedRecipe.recipe_name}</div>
          <div>{selectedRecipe.desc}</div>
          <div>{selectedRecipe.directions}</div>
          <div>{selectedRecipe.prep_time}</div>
          <div>{selectedRecipe.cooking_time}</div>
          <div>{selectedRecipe.serving}</div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
            <Loader/>
        </div>
      )}
    </div>
  );
};

export default ViewRecipe;
