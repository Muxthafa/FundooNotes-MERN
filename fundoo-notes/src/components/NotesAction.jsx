import { IconButton, Tooltip } from "@mui/material";
import React, { useState, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import ColorPopOver from "./ColorPopOver";
import service from '../service/NoteService'
import { useDispatch } from "react-redux";
import { setUpdate } from "../actions/noteAction.js";

export default function NotesAction({
  handleDelete,
  note,
  icons,
  color,
  setColor,
  index
}) {
  const [isColorPopoverOpen, setColorPopoverOpen] = useState(false);
  const refActionColor = useRef();
  const dispatch = useDispatch();

  const updateImage = (image) => {
    let data = {
      ...note,
      image: image
    };
    service.updateNote(data, note._id)
          .then((res) => {
            dispatch(setUpdate({data: res.data.Note,index: index}));  
          })
          .catch((res) => console.log(res))
  };

  const fileHandler = (event) => {
    const fd = new FormData();
    fd.append("image", event.target.files[0], event.target.files[0].name);
    service
      .uploadImage(fd)
      .then((res) => {
        updateImage(res.data.filename)
        console.log(res);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      {icons ? (
        <div
          style={{
            height: "35px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Tooltip title="colors">
            <IconButton
              onClick={() => setColorPopoverOpen(true)}
              ref={refActionColor}
            >
              <ColorLensOutlinedIcon size="small" sx={{ color: "grey" }} />
            </IconButton>
          </Tooltip>

          <input
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={fileHandler}
          />
          <label htmlFor="raised-button-file">
            <Tooltip title="Upload Image">
              <IconButton component="span">
                <InsertPhotoOutlinedIcon size="small" sx={{ color: "grey" }} />
              </IconButton>
            </Tooltip>
          </label>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(note)}>
              <DeleteIcon size="small" sx={{ color: "grey" }} />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <div style={{ height: "35px" }}></div>
      )}

      <ColorPopOver
        isOpen={isColorPopoverOpen}
        onClose={() => setColorPopoverOpen(false)}
        currentColor={color}
        onColorSelect={(color) => setColor(color)}
        anchorEl={refActionColor.current}
      />
    </div>
  );
}
