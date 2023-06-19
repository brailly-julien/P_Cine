const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// Configuration Mongoose
mongoose.connect('mongodb+srv://dbUser:dbPassword@cluster0.6ml5yl4.mongodb.net/IotProject', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion :'));
db.once('open', function() {
  console.log("Connecté à la base de données MongoDB!");

  const changeStream = Seat.watch();
  changeStream.on('change', async (change) => {
    console.log('A change occurred:', change);

    const seats = await Seat.find().select('id id_user id_movie -_id');
    io.emit('seats', seats);
  });

});

// Définition des modèles
const User = mongoose.model('User', new mongoose.Schema({ id: String, firstname: String, lastname: String, pseudo: String}));
const Seat = mongoose.model('Seat', new mongoose.Schema({ id: String, id_user: String, id_movie: String}));

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur votre application web Node.js</h1>');
});

// Ajouter une route pour récupérer les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('id firstname lastname pseudo -_id'); // récupérer les champs
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/seats', async (req, res) => {
    try {
        const seats = await Seat.find().select('id id_user id_movie -_id'); // récupérer les champs
        res.send(seats);
    } catch (err) {
        res.status(500).send(err);
    }
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080/", // remplacer par l'URL de votre application Vue.js
    methods: ["GET", "POST"]
  }
});

app.listen(3000, function() {
    console.log('Serveur en cours d\'exécution sur le port 3000');
  });