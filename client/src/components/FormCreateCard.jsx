import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const FormCreateCard = () => {
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState({ question: '', reponse: '', tag: ''});
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(card);
        setCards([...cards, card]);
        setCard({ question: '', reponse: '', tag: ''});
    }

    const handleChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _card = { ...card };
        _card[`${name}`] = val;

        setCard(_card);
    };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Créer une carte
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="question"
                label="Question"
                name="question"
                autoFocus
                value={card.question}
                onChange={(e) => handleChange(e, 'question')}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="reponse"
                label="Réponse"
                name="reponse"
                value={card.reponse}
                onChange={(e) => handleChange(e, 'reponse')}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="tag"
                label="Tag"
                name="tag"
                value={card.tag}
                onChange={(e) => handleChange(e, 'tag')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Valider
            </Button>
          </Box>
        </Box>
      </Container>
    );
}

export default FormCreateCard;