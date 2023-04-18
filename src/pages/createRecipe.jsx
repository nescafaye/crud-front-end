import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { Button, IconButton } from "@mui/material";

import axios from "axios";
import slugify from "slugify";

import { HiPlus as AddIcon, HiX as DeleteIcon, HiCloudUpload as UploadIcon } from "react-icons/hi";

import InputField from "../components/InputField";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const CreateRecipe = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipeName: "",
      desc: "",
      ingredients: [],
      directions: [{ direction: "" }],
      prepTime: "",
      cookTime: "",
      serving: "",
      recipeImage: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "directions",
  });

  const createRecipe = async (data) => {
    const slug = slugify(data.recipeName, { lower: true });
    try {
      const newRecipe = {
        recipeName: data.recipeName,
        desc: data.desc,
        ingredients: data.ingredients
          .split(",")
          .map((ingredient) => ingredient.trim()),
        directions: data.directions.map((direction) => direction.direction),
        prepTime: data.prepTime,
        cookingTime: data.cookTime,
        serving: data.serving,
        recipeImage: data.recipeImage,
        slug: slug,
      };
      const result = await axios.post(`${API_BASE_URL}/create`, newRecipe);
      console.log(result.data);
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data) => {
    try {
      createRecipe(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12">
      <div className="mb-12 text-xl font-semibold">Create Recipe</div>
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
              <>
                <InputField
                  field={field}
                  placeholder="Recipe Name"
                  size="regular"
                  error={errors.recipeName}
                  fieldName="recipe name"
                />
               
              </>
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
              <InputField field={field} placeholder="Serving" size="regular" error={errors.serving}/>
            )}
          />
        </div>
        <div className="w-full">
          <div className="space-y-2">
            <div>Image</div>
            <Button
              variant="outlined"
              startIcon={<UploadIcon/>}
              component="label"
            >
              Upload File
              <input
                type="file"
                hidden
              />
            </Button>       
            <div>Directions</div>
            {fields.map((field, index) => (
              <div className="flex gap-1" key={field.id}>
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
                <div className="relative top-2.5">
                  <IconButton onClick={() => remove(index)}>
                    <DeleteIcon size={18} color="blue" />
                  </IconButton>
                </div>
              </div>
            ))}
            <IconButton sx={{float: "right"}} onClick={() => append({ direction: "" })}>
              <AddIcon size={18} color="blue" />
            </IconButton>
          </div>
          <Button type="submit" sx={{ width: "100%" }} size="regular">
            Create
          </Button>
          <Link to={"/"}>
            <Button sx={{ width: "100%" }} color="error" size="regular">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
