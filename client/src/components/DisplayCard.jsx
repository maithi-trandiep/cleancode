import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';

const DisplayCard = ({ card }) => {
    return (
        <Card sx={{ width: '20%', margin: '0 1rem 1rem' }} style={{ "boxShadow": "rgba(149, 157, 165, 0.2) 0px 8px 24px", "padding": "6rem 2rem", "borderRadius": "10px" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {card.question}
                </Typography>
                <Typography variant="h5" component="div">
                    {card.answer}
                </Typography>
                <Grid container spacing={10} justifyContent="center">
                    <Grid item>
                        <Badge badgeContent={card.tag} color="primary">
                        </Badge>
                    </Grid>
                    <Grid item>
                        <Badge badgeContent={card.category} color="secondary">
                        </Badge>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default DisplayCard;
