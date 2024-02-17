const express = require('express');
const app = express();
const ficheRoutes = require('./Routes/CardRoutes');
app.use('/', ficheRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});