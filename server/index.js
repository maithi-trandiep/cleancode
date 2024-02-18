const express = require('express');
const app = express();
const cors = require('cors');

const { router } = require('./Routes/CardRoutes');
const { quizRouter } = require('./Routes/QuizRoutes');
const cors = require('cors');

app.use(cors());
app.use('/', router);
app.use('/', quizRouter);

// Démarrer le serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});