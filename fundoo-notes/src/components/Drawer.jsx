import React from "react";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setTrashValue } from "../actions/noteAction.js";

import "../css/style.css";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  borderRight: "0px",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  borderRight: "0px",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const ListItems = styled(ListItem)`
  &:hover {
    background-color: #e6e8e6;
  }
  &:focus {
    background-color: #f5cb90;
  }
  border-radius: 0 25px 25px 0;
`;

function DrawerBar({ open, handleTitle, handleTrash }) {
  const dispatch = useDispatch();
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader />
      <List>
        <ListItems
          button
          className="nav"
          onClick={() => {
            dispatch(setTrashValue("false"));
            handleTitle("Notes");
          }}
        >
          <ListItemIcon>
            <LightbulbOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Notes" />
        </ListItems>
        <ListItems
          button
          className="nav"
          onClick={() => handleTitle("Reminders")}
        >
          <ListItemIcon>
            <NotificationsNoneOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Reminders" />
        </ListItems>
        <ListItems button onClick={() => handleTitle("Edit Labels")}>
          <ListItemIcon>
            <EditOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Label" />
        </ListItems>
        <ListItems button onClick={() => handleTitle("Archive")}>
          <ListItemIcon>
            <ArchiveOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Archive" />
        </ListItems>
        <ListItems button onClick={() => {
          dispatch(setTrashValue("true")); handleTitle("Trash")}}>
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItems>
      </List>
    </Drawer>
  );
}

export default DrawerBar;
