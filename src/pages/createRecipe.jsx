import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { IconButton } from "@mui/material";
import axios from "axios";
import slugify from "slugify";

import { HiPlus as AddIcon, HiX as DeleteIcon } from "react-icons/hi";

import InputField from "../components/InputField";

const API_BASE_URL = "http://localhost:3000/recipes";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      recipeName: "",
      desc: "",
      directions: [{ direction: "" }],
      prepTime: "",
      cookTime: "",
      serving: "",
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
        directions: data.directions.map((direction) => direction.direction),
        prepTime: data.prepTime,
        cookingTime: data.cookTime,
        serving: data.serving,
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
    <div className="max-w-7xl mx-auto">
      <div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
              <InputField field={field} placeholder="Prep Time" size="small" />
            )}
          />
          <Controller
            name="cookTime"
            control={control}
            render={({ field }) => (
              <InputField field={field} placeholder="Prep Time" size="small" />
            )}
          />
          <Controller
            name="serving"
            control={control}
            render={({ field }) => (
              <InputField field={field} placeholder="Serving" size="small" />
            )}
          />
          <button type="submit">Create</button>
          <Link to={"/"}>
            <button className="w-full" type="button">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
