import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { IconButton } from "@mui/material";
import axios from "axios";

import Loader from "../components/Loader";
import { HiPlus as AddIcon, HiX as DeleteIcon } from "react-icons/hi";

import InputField from "../components/InputField";

const API_BASE_URL = "http://localhost:3000/recipes";

const EditRecipe = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [isHovered, setHovered] = useState(false);

  // const handleEnter = (index) => {
  //   setHovered(index);
  // };

  // const handleLeave = () => {
  //   setHovered(-1);
  // };

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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
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
    <div className="max-w-7xl mx-auto">
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
                <InputField
                  field={field}
                  placeholder="Recipe Name"
                  size="small"
                />
              )}
            />
            <Controller
              name="desc"
              control={control}
              render={({ field }) => (
                <InputField
                  field={field}
                  placeholder="Description"
                  size="small"
                  multiline={true}
                  rows="3"
                />
              )}
            />
            <div className="space-y-2 w-[50%]">
              <div>Directions</div>
              {fields.map((field, index) => (
                <div className="flex gap-2 items-center" key={field.id}>
                  <Controller
                    name={`directions[${index}].direction`}
                    control={control}
                    defaultValue={field.direction}
                    render={({ field }) => (
                      <InputField
                        field={field}
                        // sx={{ width: "100%" }}
                        placeholder={`Item ${index + 1}`}
                        size="small"
                        multiline={true}
                        // enter={() => handleEnter(index)}
                        // leave={() => handleLeave()}
                      />
                    )}
                  />
                  {/* {isHovered === index && ( */}
                  <IconButton onClick={() => remove(index)}>
                    <DeleteIcon size={18} color="blue" />
                  </IconButton>
                  {/* )} */}
                </div>
              ))}
              <IconButton onClick={() => append({ direction: "" })}>
                <AddIcon size={18} color="blue" />
              </IconButton>
            </div>
            <Controller
              name="prepTime"
              control={control}
              render={({ field }) => (
                <InputField
                  field={field}
                  placeholder="Prep Time"
                  size="small"
                />
              )}
            />
            <Controller
              name="cookTime"
              control={control}
              render={({ field }) => (
                <InputField
                  field={field}
                  placeholder="Prep Time"
                  size="small"
                />
              )}
            />
            <Controller
              name="serving"
              control={control}
              render={({ field }) => (
                <InputField field={field} placeholder="Serving" size="small" />
              )}
            />
            <button type="submit">Update</button>
            <Link to={"/"}>
              <button className="w-full" type="button">
                Cancel
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
