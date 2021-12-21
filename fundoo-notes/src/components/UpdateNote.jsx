import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import {
  InputBase,
  Grid,
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardMedia,
} from "@mui/material";
import service from "../service/NoteService";
import { useDispatch } from "react-redux";
import { setUpdate } from "../actions/noteAction.js";

const Wrap = styled(Paper)(({ theme }) => ({
  width: "45%",
  margin: "1% auto 2%",
}));

export default function Popup({ popup, showNote, editNote }) {
  const dispatch = useDispatch();

  let noteDetails = {
    title: editNote.note.title,
    content: editNote.note.content,
    isTrash: editNote.note.isTrash,
  };
  const [details, setDetails] = useState(noteDetails);

  const handleNoteState = (event) => {
    let { name, value } = event.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    let data = {
      title: details.title,
      content: details.content,
      isTrash: details.isTrash,
    };

    if (data.title !== "" && data.content !== "") {
      showNote();
      service
        .updateNote(data, editNote.note._id)
        .then((res) => {
          console.log(res);
          dispatch(setUpdate({ data: res.data.Note, index: editNote.index }));
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <Dialog onClose={showNote} open={popup}>
      <CardMedia
        component="img"
        height="150px"
        image={`http://localhost:5000/${editNote.note.image}`}
        alt="Unavailable"
      />
      <DialogTitle>
        <InputBase
          variant="standard"
          placeholder="Title"
          inputProps={{
            style: {
              color: "black",
              height: "36px",
              width: "500px",
              fontWeight: "bold",
              fontSize: "25px",
            },
          }}
          elevation={3}
          fullWidth
          name="title"
          value={details.title}
          onChange={handleNoteState}
        />
      </DialogTitle>

      <DialogContent>
        <InputBase
          variant="standard"
          multiline={true}
          elevation={3}
          fullWidth
          name="content"
          value={details.content}
          onChange={handleNoteState}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleUpdate}
          style={{ color: "black", textTransform: "none" }}
        >
          submit
        </Button>
        <Button
          onClick={showNote}
          style={{ color: "black", textTransform: "none" }}
        >
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
