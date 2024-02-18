import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { CardService } from '../service/CardService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const FormCreateCard = ({ onNewCard }) => {
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState({user_id: 1, question: '', answer: '', tag: '', category: 'FIRST'});
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCard = await CardService.createCard(card);
        if (newCard) {
            console.log("newCard", newCard);
            setCards([...cards, newCard]);
            setCard({user_id: 1, question: '', answer: '', tag: '', category: 'FIRST'});
            handleSuccess();
            
            onNewCard(newCard);
        }
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Card created successfully !
          </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create new card
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
                id="answer"
                label="Answer"
                name="answer"
                value={card.answer}
                onChange={(e) => handleChange(e, 'answer')}
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
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    );
}

export default FormCreateCard;