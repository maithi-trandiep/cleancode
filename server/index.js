const express = require('express');
const app = express();

const cardRouter  = require('./Routes/CardRoutes.js');
const quizRouter = require('./Routes/QuizRoutes.js');
const cors = require('cors');

app.use(cors());
app.use('/', cardRouter);
app.use('/', quizRouter);

// Démarrer le serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});