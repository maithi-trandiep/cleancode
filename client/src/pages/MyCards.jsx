import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TagService } from '../service/TagService';
import { CardService } from '../service/CardService';
import DisplayCard from '../components/DisplayCard';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const MyCards = () => {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const tags = await TagService.getAllTags();
            setTags(tags);
        }
        fetchTags();
    }
    , []);
    
    const handleChange = (event) => {
        setSelectedTag(event.target.value);
        const fetchCards = async () => {
            const cards = await CardService.getCardsByTags(event.target.value);
            console.log(cards);
            setCards(cards);
        }
        fetchCards();
    };

    return (
        <>
            <Box>
                <FormControl fullWidth sx={{ width: '300px', marginTop: '20px' }}>
                    <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedTag}
                    label="Tag"
                    onChange={handleChange}
                    >
                    {tags.map((tag, index) => (
                            <MenuItem key={index} value={tag}>{tag}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
           
            <Box display="flex" justifyContent="center">
            <Grid container spacing={5} justifyContent="center">
                {cards && cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} container justifyContent="center">
                        <DisplayCard card={card} />
                    </Grid>
                ))}
            </Grid>
        </Box>
        </>
    );
}

export default MyCards;