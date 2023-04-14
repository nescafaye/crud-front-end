import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from "@mui/material";
import { HiPlus as AddIcon } from "react-icons/hi";

import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Row from "../components/Row";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState("");

  const getRecipe = async () => {
    const result = await axios.get(`${API_BASE_URL}/all`);
    setRecipes(result.data);
  };

  const getRecipeBySlug = async (slug) => {
    const result = await axios.get(`${API_BASE_URL}/${slug}`);
    setSelectedRecipe(result.data); // set the selected recipe in state
    setOpenDialog(true);
  };

  const deleteRecipe = async (slug) => {
    try {
      await axios.delete(`${API_BASE_URL}/${slug}/delete`);
      setRecipes(
        recipes.filter((recipe) => recipe.slug !== selectedRecipe.slug)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedRecipe(null);
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-12">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Recipes</h1>
          <div className="flex items-center space-x-2">
            <Search />
            <Link to={`/recipes/create`}>
              <IconButton>
                <AddIcon color="blue" size={19} />
              </IconButton>
            </Link>
          </div>
        </div>
        <TableContainer component={Paper} elevation={0}>
          <Table
            sx={{
              minWidth: "650px",
              bgcolor: "#191925",
              "th, td": { borderColor: "#424248" },
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow sx={{ th: { fontWeight: "bold", color: "white" } }}>
                <TableCell>Recipe Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Ingredients</TableCell>
                <TableCell align="left">Directions</TableCell>
                <TableCell align="left">Prep Time</TableCell>
                <TableCell align="left">Cook Time</TableCell>
                <TableCell align="left">Serving</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes && recipes.length > 0
                ? recipes.map((recipe) => (
                    <Row
                      key={recipe.id}
                      data={recipe}
                      onClick={getRecipeBySlug}
                      onDelete={() => {
                        setSelectedRecipe(recipe);
                        setOpenConfirmDelete(true);
                      }}
                    />
                  ))
                : 
                  ""}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedRecipe && (
          <>
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              PaperProps={{
                style: {
                  backgroundColor: "#191925",
                  color: "white",
                },
              }}
            >
              <DialogTitle>Directions</DialogTitle>
              <DialogContent>
                <ol start={1}>
                  {selectedRecipe.directions.map((direction, index) => (
                    <li>
                      {index + 1}. {direction}
                    </li>
                  ))}
                </ol>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Close</Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openConfirmDelete}
              onClose={() => setOpenConfirmDelete(false)}
              PaperProps={{
                style: {
                  backgroundColor: "#191925",
                  color: "white",
                },
              }}
            >
              <DialogTitle>Delete Recipe</DialogTitle>
              <DialogContent>
                <p>
                  Are you sure you want to delete the recipe "
                  {selectedRecipe.recipe_name}"?
                </p>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenConfirmDelete(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setOpenConfirmDelete(false);
                    deleteRecipe(selectedRecipe.slug);
                  }}
                  color="error"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
    </>
  );
};

export default Recipes;
