const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());

// Configuration Mongoose
mongoose.connect('mongodb+srv://dbUser:dbPassword@serverlessinstanceiottp.ygpm5nj.mongodb.net/IotProject', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion :'));
db.once('open', function() {
  console.log("Connecté à la base de données MongoDB!");
});

// Définition des modèles
const User = mongoose.model('User', new mongoose.Schema({ id: String, firstname: String, /* etc. */ }));

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur votre application web Node.js</h1>');
});

// Ajouter une route pour récupérer les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('id firstname -_id'); // récupérer uniquement les champs 'id' et 'firstname'
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Serveur web en cours d'exécution sur le port ${port}`);
});