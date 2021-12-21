import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Buttons from "@mui/material/Button";
import { Grid, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import Circle from '@mui/icons-material/Circle';


export default function ColorPopOver({ isOpen, onClose, anchorEl , onColorSelect}) {
  return (
    <div>
      <Popover 
        open={isOpen}
        onClose={onClose}
        anchorEl={anchorEl}
        aanchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
      >
        <Grid container sx={{ p: 1 }} >
          {["#fafcfb","#F28B82", "#FBBC05", "#FFF475","	#CCFF90","#A7FFEB","#CBF0F8","#AECBFA","#D7AEFB","#FDCFE8","#E6C9A8","#E8EAED"].map((note, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} sx={{width:"11px"}} key={index}>
                <Circle style={{color: note, fontSize: 29}} onClick={()=> onColorSelect(note)} />
              </Grid>
            );
          })}
        </Grid>
      </Popover>
    </div>
  );
}
