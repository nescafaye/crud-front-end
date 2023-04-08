import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Modal,
} from "@mui/material";

import {
  HiPlus as AddIcon,
  HiPencilAlt as EditIcon,
  HiEye as ViewIcon,
  HiTrash as DeleteIcon,
  HiSearch as SearchIcon,
} from "react-icons/hi";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

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

  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipeBySlug = async (slug) => {
    const result = await axios.get(`${API_BASE_URL}/${slug}`);
    setSelectedRecipe(result.data); // set the selected recipe in state
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Recipes</h1>
          <div className="flex items-center space-x-2">
            <TextField
              id="search-bar"
              className="inputRounded"
              variant="outlined"
              placeholder="Search..."
              size="small"
              sx={{
                // make this reusable
                backgroundColor: "#191925",
                borderRadius: "10px",
                borderWidth: "0.5px",
                fontSize: "12px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#424248",
                },
                "&:hover:not(.Mui-disabled)": {
                  backgroundColor: "#050514",
                  transition: "all",
                  transitionDuration: "0.3s",
                },
                "&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#424248",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#424248",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ fill: "blue", fontSize: 18 }} />
                  </InputAdornment>
                ),
                style: {
                  fontSize: 15,
                  color: "white"
                },
              }}
            />
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
                  <TableRow
                    key={recipe.id}
                    sx={{
                      "th, td": { color: "#d7d7db" },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {recipe.recipe_name}
                    </TableCell>
                    <TableCell align="left">{recipe.desc}</TableCell>
                    <TableCell align="left">
                      {recipe.directions
                        .slice(0, (recipe.directions.length = 1))
                        .map((direction, index) => {
                          const itemNo = index + 1;
                          return (
                            <ol key={itemNo}>
                              <li>
                                {itemNo}. {direction}
                              </li>
                            </ol>
                          );
                        })}
                      {recipe.directions.length > 0 && (
                        <button
                          className="text-slate-500 text-xs"
                          onClick={() => getRecipeBySlug(recipe.slug)}
                        >
                          View more
                        </button>
                      )}
                    </TableCell>
                    <TableCell align="left">{recipe.prep_time}</TableCell>
                    <TableCell align="left">{recipe.cooking_time}</TableCell>
                    <TableCell align="left">{recipe.serving}</TableCell>
                    <TableCell align="left">
                      <div className="inline-flex">
                        <Link to={`/recipes/edit/${recipe.slug}`}>
                          <IconButton>
                            <EditIcon color="blue" size={18} />
                          </IconButton>
                        </Link>
                        <Link to={`/recipes/${recipe.slug}`}>
                          <IconButton>
                            <ViewIcon color="blue" size={18} />
                          </IconButton>
                        </Link>
                        <IconButton>
                          <DeleteIcon color="blue" size={18} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Loader />
                  </TableCell>
                </TableRow>
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
