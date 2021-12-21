import React, {useState, useEffect} from "react";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Paper, Grid , InputBase, Button} from "@mui/material";
import service from '../service/NoteService'
import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import { setCreate } from "../actions/noteAction.js";

const TextField = styled(MuiTextField)(({ theme }) => ({
  margin: "0px 0px 20px",
  width: "50%",
}));

const Wrap = styled(Paper)(({ theme }) => ({
  width: "45%",
  margin: "1% auto 2%",
}));


function CreateNote() {
  const dispatch = useDispatch()
  let noteDetails={
    title: "",
    content: ""
  }
  const [visible, setVisibility] = useState(false)
  
  const [details, setDetails] = useState(noteDetails)

  const handleNoteState = (event) => {
    let { name, value } = event.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddNotes = () => {
    let data = {
      title: details.title,
      content: details.content,
      color: "#fafcfb",
      isTrash: false
    };
    setDetails(noteDetails)
    setVisibility(false)
    if(data.title != "" && data.content !=""){
      service
      .setNotes(data)
      .then((res) => {
        dispatch(setCreate(res.data.createdNote.Note))
      })
      .catch((err) => console.log(err));
    }   
  };

  return (
      <Wrap elevation={5} sx={{ padding: "0px 2% 0px 2%" }}>
          {visible ===false ?
          <InputBase
            variant="standard"
            placeholder="Take a note..."
            inputProps={{
              style: {height: "36px" },
            }}
            fullWidth
            onClick={()=> setVisibility(true)}
          /> 
          :
          <Grid container>
            <Grid item xs={12}>
          <InputBase
            variant="standard"
            placeholder="Title"
            inputProps={{
              style: { color: "black", height: "36px" },
              disableUnderline: true,
            }}
            elevation={3}
            fullWidth
            name="title"
            value={details.title}
            onChange={handleNoteState}
          />
          </Grid>
          <Grid item xs={12}>
          <InputBase
            variant="standard"
            placeholder="Take a note..."
            inputProps={{
              style: { color: "black", height: "36px" },
              disableUnderline: true,
            }}
            multiline={true}
            elevation={3}
            fullWidth
            name="content"
            value={details.content}
            onChange={handleNoteState}
          />
          </Grid>
          <Grid item xs={12} align="right">
           <Button onClick={handleAddNotes} style={{color:"black", textTransform:"none"}}>close</Button>
          </Grid>
          </Grid>
}
      </Wrap>
  );
}

export default CreateNote;
