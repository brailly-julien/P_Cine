const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur votre application web Node.js</h1>');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Serveur web en cours d'exécution sur le port ${port}`);
});
