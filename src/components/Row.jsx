import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { IconButton } from "@mui/material";
import Skeleton from "./Skeleton";
import {
  HiPencilAlt as EditIcon,
  HiEye as ViewIcon,
  HiTrash as DeleteIcon,
} from "react-icons/hi";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

const Row = ({ data, onClick, onDelete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);


  return isLoading ? (
    <TableRow>
      <TableCell colSpan={7}>
        <div className="loading-skeleton">
          <Skeleton />
        </div>
      </TableCell>
    </TableRow>
  ) : (
    <TableRow
      id={data.id}
      sx={{
        "th, td": { color: "#d7d7db" },
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        <div>{data.recipe_name}</div>
      </TableCell>
      <TableCell align="left"><div>{data.desc}</div></TableCell>
      <TableCell align="left">
        {data.ingredients
          .slice(0, (data.ingredients.length = 1))
          .map((ingredient) => {
            return (
              <div className="text-ellipsis overflow-hidden whitespace-nowrap w-36">
                {ingredient}
              </div>
            );
          })}
      </TableCell>
      <TableCell align="left">
        {data.directions
          .slice(0, (data.directions.length = 1))
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
        {data.directions.length > 0 && (
          <button
            className="text-slate-500 text-xs"
            onClick={() => onClick(data.slug)}
            // onClick={() => setOpenDialog(data.slug)}
          >
            View more
          </button>
        )}
      </TableCell>
      <TableCell align="left"><div>{data.prep_time}</div></TableCell>
      <TableCell align="left"><div>{data.cooking_time}</div></TableCell>
      <TableCell align="left"><div>{data.serving}</div></TableCell>
      <TableCell align="left"><div>{data.recipe_image}</div></TableCell>
      <TableCell align="left">
        <div className="inline-flex">
          <Link to={`/recipes/edit/${data.slug}`}>
            <IconButton>
              <EditIcon color="blue" size={18} />
            </IconButton>
          </Link>
          <Link to={`/recipes/${data.slug}`}>
            <IconButton>
              <ViewIcon color="blue" size={18} />
            </IconButton>
          </Link>
          <IconButton onClick={() => onDelete(data.slug)}>
            <DeleteIcon color="blue" size={18} />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Row;
