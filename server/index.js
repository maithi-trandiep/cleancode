const express = require('express');
const app = express();
const ficheRoutes = require('./Routes/ficheRoutes');
app.use('/api', ficheRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});