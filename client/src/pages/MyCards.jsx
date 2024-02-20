import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { CardService } from "../service/CardService";
import DisplayCard from "../components/DisplayCard";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const MyCards = () => {
  const [tag, setTag] = useState("");
  const [cards, setCards] = useState([]);

  const handleChange = (event) => {
    setTag(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await CardService.getCardsByTags(tag);
    if(response) setCards(response);
  };

  useEffect(() => {
    const fetchCards = async () => {
      const response = await CardService.getAllCards();
      setCards(response);
    };
    fetchCards();
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="tag"
            label="Tag"
            name="tag"
            variant="outlined"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Chercher
          </Button>
        </Box>
      </Container>

      <Box display="flex" justifyContent="center">
        <Grid container spacing={5} justifyContent="center">
          {cards &&
            cards.map((card, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                container
                justifyContent="center"
              >
                <DisplayCard card={card} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default MyCards;
