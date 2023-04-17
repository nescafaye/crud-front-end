import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { IconButton, Button } from "@mui/material";
import axios from "axios";

import Loader from "../components/Loader";
import { HiPlus as AddIcon, HiX as DeleteIcon } from "react-icons/hi";

import InputField from "../components/InputField";
import CustomSnackbar from "../components/CustomSnackbar";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const EditRecipe = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${slug}`);
      console.log(response.data);
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateRecipe = async (data) => {
    const updatedRecipe = {
      recipe_name: data.recipeName,
      desc: data.desc,
      ingredients: data.ingredients.split(","),
      directions: data.directions.map((direction) => direction.direction),
      prep_time: data.prepTime,
      cooking_time: data.cookTime,
      serving: data.serving,
    };
    try {
      const result = await axios.patch(
        `${API_BASE_URL}/${slug}/update`,
        updatedRecipe
      );
      navigate(`/recipes/edit/${result.data.slug}`);
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [slug]);

  const { control, handleSubmit, formState: { errors } } = useForm({
    values: {
      recipeName: selectedRecipe ? selectedRecipe.recipe_name : "",
      desc: selectedRecipe ? selectedRecipe.desc : "",
      ingredients: selectedRecipe ? selectedRecipe.ingredients.join(",") : "",
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
    name: "directions",
  });

  const onSubmit = (data) => {
    try {
      updateRecipe(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12">
        <div className="mb-12 text-xl font-semibold">Edit Recipe</div>
        {selectedRecipe ? (
          <div>
            <form
              className="flex flex-col lg:flex-row flex-wrap gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex-1 space-y-2">
                <div>Recipe Name</div>
                <Controller
                  name="recipeName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputField
                      field={field}
                      placeholder="Recipe Name"
                      size="regular"
                      error={errors.recipeName}
                    />
                  )}
                />
                <div>Description</div>
                <Controller
                  name="desc"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputField
                      field={field}
                      placeholder="Description"
                      size="regular"
                      multiline={true}
                      rows={5}
                      error={errors.desc}
                    />
                  )}
                />
                <div>Prep Time</div>
                <Controller
                  name="prepTime"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputField
                      field={field}
                      placeholder="Prep Time"
                      size="regular"
                      error={errors.prepTime}
                    />
                  )}
                />
              </div>
              <div className="flex-1 space-y-2">
              <div>Ingredients</div>
                <Controller
                  name="ingredients"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputField
                      field={field}
                      placeholder="Ingredients (comma-separated)"
                      size="regular"
                      multiline={true}
                      rows={5}
                      error={errors.ingredients}
                    />
                  )}
                />
                <div>Cook Time</div>
                <Controller
                  name="cookTime"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputField
                      field={field}
                      placeholder="Cook Time"
                      size="regular"
                      error={errors.cookTime}
                    />
                  )}
                />
                <div>Serving</div>
                <Controller
                  name="serving"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputField
                      field={field}
                      placeholder="Serving"
                      size="regular"
                      error={errors.serving}
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <div className="space-y-2">
                  <div>Directions</div>
                  {fields.map((field, index) => (
                    <div className="flex gap-2 items-center" key={field.id}>
                      <Controller
                        name={`directions[${index}].direction`}
                        control={control}
                        rules={{ required: true }}
                        defaultValue={field.direction}
                        render={({ field }) => (
                          <InputField
                            field={field}
                            // sx={{ width: "100%" }}
                            placeholder={`Item ${index + 1}`}
                            size="regular"
                            multiline={true}
                            error={errors.directions}
                          />
                        )}
                      />
                      <IconButton onClick={() => remove(index)}>
                        <DeleteIcon size={18} color="blue" />
                      </IconButton>
                    </div>
                  ))}
                  <IconButton sx={{float: "right"}} onClick={() => append({ direction: "" })}>
                    <AddIcon size={18} color="blue" />
                  </IconButton>
                </div>
                <Button type="submit" sx={{ width: "100%" }} size="regular">
                  Update
                </Button>
                <Link to={"/"}>
                  <Button sx={{ width: "100%" }} color="error" size="regular">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        )}
      </div>

      <CustomSnackbar
        message="Update Successful!"
        severity="success"
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default EditRecipe;
