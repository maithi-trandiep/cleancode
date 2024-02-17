import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ width: '25%' }} style={{"box-shadow": "rgba(149, 157, 165, 0.2) 0px 8px 24px", "padding": "6rem 2rem", "border-radius": "10px"}}>
      <CardContent>
        <Typography variant="h5" component="div">
          {bull} Quelle est la capital de la France ?
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Europe
        </Typography>
        <TextField id="standard-basic" label="Réponse" variant="standard" />
      </CardContent>
    </Card>
  );
}
