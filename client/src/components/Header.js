import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  //global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userid");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state
  const [value, setValue] = useState(0);

  //logout
  const handlelogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => {
                  setValue(val);
                }}
              >
                <Tab label="Blogs" component={Link} to="/blogs" />
                <Tab label="My Blogs" component={Link} to="/my-blogs" />
                <Tab label="Create Blog" component={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button onClick={handlelogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
