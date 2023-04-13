import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { HiPlus as AddIcon } from "react-icons/hi";

import { useEffect, useState } from "react";

import axios from "axios";
import Loader from "../components/Loader";
import Search from "../components/Search";
import Row from "../components/Row";

const API_BASE_URL = "http://localhost:3000/recipes";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState("");

  const getRecipe = async () => {
    const result = await axios.get(`${API_BASE_URL}/all`);
    setRecipes(result.data);
  };

  const getRecipeBySlug = async (slug) => {
    const result = await axios.get(`${API_BASE_URL}/${slug}`);
    setSelectedRecipe(result.data); // set the selected recipe in state
  };

  useEffect(() => {
    getRecipe();
  }, []);


  // const updateRecipe = async (slug) => {
  //   try {
  //     const result = await axios.patch(
  //       `${API_BASE_URL}/${slug}/update`,
  //       recipes
  //     );
  //     console.log(result.data);
  //     getRecipe();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleDelete = (slug) => {
  //   setRecipes(recipes.filter(recipe => recipe.slug !== slug));
  // };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Recipes</h1>
          <div className="flex items-center space-x-2">
            <Search/>
            <IconButton>
              <AddIcon color="blue" size={19} />
            </IconButton>
          </div>
        </div>
        <TableContainer component={Paper} elevation={0}>
          <Table
            sx={{ minWidth: "650px", bgcolor: "#191925", "th, td": { borderColor: "#424248" }}}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow sx={{ th: { fontWeight: "bold", color: "white" } }}>
                <TableCell>Recipe Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Directions</TableCell>
                <TableCell align="left">Prep Time</TableCell>
                <TableCell align="left">Cook Time</TableCell>
                <TableCell align="left">Serving</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes && recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <Row key={recipe.id} data={recipe} onClick={getRecipeBySlug}/>
                ))
              ) : (
                // <TableRow>
                //   <TableCell colSpan={7} align="center">
                //     <Loader />
                //   </TableCell>
                // </TableRow>
                ""
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedRecipe && (
          <div>
            <p>{selectedRecipe.directions} add component for ordered list</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Recipes;
