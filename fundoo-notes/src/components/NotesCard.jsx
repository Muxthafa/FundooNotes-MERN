import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  CardMedia,
} from "@mui/material";

import PushPinIcon from "@mui/icons-material/PushPin";
import NotesAction from "./NotesAction.jsx";
import {useSelector} from 'react-redux'
import Service from '../service/NoteService'
import { useDispatch } from "react-redux";
import {  } from "../actions/noteAction.js";
import "../css/style.css";

export default function NotesCard({
  note,
  showNote,
  index,
  handleDelete,
}) {

  const myNotes = useSelector((state) => state.allNotes.filteredNotes);

  const [icons, setIcons] = useState(false);

  const [color, setColor] = useState(note.color);

  const updateColor = (color) => {
    let data = {
      ...note,
      color: color
    };
    setColor(color);
    Service.setColor(data, note._id)
          .then((res) => {
            // dispatch(addTrashNote(res.data.Note));
            console.log(res);
          })
          .catch((res) => console.log(res))
  };


  return (
    <Card
      onMouseOver={() => {
        setIcons(true);
      }}
      onMouseLeave={() => {
        setIcons(false);
      }}
      elevation={icons ? 3 : 2}
      style={{backgroundColor: color}}
    >

{note.image !=="" ? <CardMedia
                    component="img"
                    height="150px"
                    image={`http://localhost:5000/${note.image}`}
                    alt="Unavailable"
                  />:null}
      <CardContent onClick={() => showNote(note, index)} >
      
        <Typography
          sx={{ fontSize: 17, fontWeight: "bold", color: "black" }}
          color="text.secondary"
          gutterBottom
        >
          {note.title}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary" className="cardContent">
          {note.content}
        </Typography>
      </CardContent>

      <NotesAction
        handleDelete={handleDelete}
        note={note}
        icons={icons}
        color={color}
        setColor={updateColor}
        index={index}
      />
    </Card>
  );
}
