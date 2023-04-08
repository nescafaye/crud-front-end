import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { Button, OutlinedInput } from "@mui/material";
import axios from "axios";

import Loader from "../components/Loader";
import Recipes from "./recipes";

const API_BASE_URL = "http://localhost:3000/recipes";

const EditRecipe = () => {
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

  const { control, handleSubmit } = useForm({
    values: {
      recipeName: selectedRecipe ? selectedRecipe.recipe_name : "",
      desc: selectedRecipe ? selectedRecipe.desc : "",
      directions: selectedRecipe
        ? selectedRecipe.directions.map((direction) => ({ direction }))
        : [{ direction: "" }],
        
      prepTime: selectedRecipe ? selectedRecipe.prep_time : "",
      cookTime: selectedRecipe ? selectedRecipe.cooking_time : "",
      serving: selectedRecipe ? selectedRecipe.serving : "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "directionsArray",
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      {selectedRecipe ? (
        <div>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="recipeName"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  placeholder="Recipe Name"
                  size="small"
                />
              )}
            />
            <Controller
              name="desc"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  placeholder="Description"
                  size="small"
                  multiline
                  rows={3}
                  variant="filled"
                />
              )}
            />
            {selectedRecipe.directions.map((field, index) => (
              <div key={field.id}>
                <Controller
                  name="directions"
                  control={control}
                  defaultValue={field.direction}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      placeholder="Directions"
                      size="small"
                      multiline
                      rows={2}
                      variant="filled"
                    />
                  )}
                />

                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </div>
            ))}
            <Controller
              name="prepTime"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  placeholder="Prep Time"
                  size="small"
                  type="number"
                />
              )}
            />
            <Controller
              name="cookTime"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  placeholder="Cook Time"
                  size="small"
                  type="number"
                />
              )}
            />
            <Controller
              name="serving"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  placeholder="Serving"
                  size="small"
                  type="number"
                />
              )}
            />
            <button type="submit">Submit</button>
            <Link to={"/"}>
              <button className="w-full" type="button">
                Back
              </button>
            </Link>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default EditRecipe;
