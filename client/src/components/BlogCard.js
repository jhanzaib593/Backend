import * as React from "react";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./BlogCard.css";
import { BASE_URL } from "../constant";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const handledelete = async () => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/v1/blog/delete-blog/${id}`
      );
      if (data?.success) {
        toast.success("Blog Delete");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <img src={image} height="400" width="100%" className="blg_img" alt="" />

      <div className="cd_us">
        <img
          src={image}
          height={40}
          width={40}
          alt={username}
          title={username}
        />
      </div>
      <div className="cd_cart">
        <a href="#" class="text-decoration-none">
          Car
        </a>
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <EditIcon color="info" />
            </IconButton>
            <IconButton onClick={handledelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
      </div>
      <div className="cd_tx">
        <Typography className="cd_ti" variant="h4" color="">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </div>
    </>
  );
}
