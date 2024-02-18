const express = require('express');
const app = express();
const cardRoutes = require('./Routes/CardRoutes');
const cors = require('cors');

app.use(cors());
app.use('/', cardRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});