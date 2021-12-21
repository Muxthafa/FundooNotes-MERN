import NotesCard from "./NotesCard.jsx";
import api from "../service/NoteService";
import React, { useEffect, useState } from "react";
import { Button, Grid, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import Popup from "./UpdateNote";
import Service from "../service/NoteService";
import { useDispatch } from "react-redux";
import { addTrashNote, setPinNotes } from "../actions/noteAction.js";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

import { removeTrashNote } from "../actions/noteAction.js";

const Notes = () => {
  const dispatch = useDispatch();

  const [popup, setPopup] = useState(false);
  const [editNote, setEditedNote] = useState({});
  const [snackBar, setSnackBar] = useState(false);
  const [undoItem, setUndoItem] = useState({});

  const [grid, setGrid] = useState(null)

  const myNotes = useSelector((state) => state.allNotes.filteredNotes);
  const view = useSelector((state) => state.allNotes.gridState);

  const handlePopup = (note, index) => {
    const data = {
      note: note,
      index: index,
    };
    setEditedNote(data);
    setPopup((prev) => !prev);
  };

  const handleClose = () => {
    setPopup((prev) => !prev);
  };

  const handleDelete = (note) => {
    let data = {
      ...note,
      isTrash: true,
    };

    Service.setTrash(data, note._id)
      .then((res) => {
        dispatch(addTrashNote(res.data.Note));
        setUndoItem(note);
        setSnackBar(true);
      })
      .catch((res) => console.log(res));
  };

  const handleTrash = () => {
    let data = {
      ...undoItem,
      isTrash: false,
    };
    Service.setTrash(data, undoItem._id)
      .then((res) => {
        console.log(res);
        dispatch(removeTrashNote(res.data.Note));
      })
      .catch((res) => console.log(res));
  };

  const action = (
    <React.Fragment>
      <Button size="small" onClick={handleTrash} style={{ color: "yellow" }}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setSnackBar(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Grid container spacing={3} justifyContent={view? "center": null}>
      {myNotes.map((note, index) => {
        return (
          <Grid item xs={12} sm={6} md={view ? 8 : 3} key={note._id} >
            <NotesCard
              note={note}
              showNote={handlePopup}
              index={index}
              handleDelete={handleDelete}
            />
          </Grid>
        );
      })}
      {popup ? (
        <Popup popup={popup} showNote={handleClose} editNote={editNote} />
      ) : null}
      <Snackbar
        open={snackBar}
        autoHideDuration={6000}
        onClose={() => setSnackBar(false)}
        message="Note trashed"
        action={action}
      />
    </Grid>
  );
};

export default Notes;
