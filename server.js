const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const jwt = require('jsonwebtoken');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // remplacer par l'URL de votre application Vue.js
    methods: ["GET", "POST"]
  }
});

app.use(cors());
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

  const SeatchangeStream = Seat.watch();
  SeatchangeStream.on('change', async (change) => {
    console.log('A change occurred seat :', change);

    const seats = await Seat.find().select('id id_user id_movie -_id');
    io.emit('seatsChanged', seats);

    
    const seat = await Seat.findById(change.documentKey._id);
    const movies= db.collection('movies');

    const movie = await movies.findOne({ id: seat.id_movie });
    const tokenduration = movie.length;
    
    if (seat && seat.id_user != null && seat.id_movie != null) {
      const tokenDurationInSeconds = tokenduration * 60;
      const token = jwt.sign({
        id: seat._id,
        id_user: seat.id_user,
        id_movie: seat.id_movie,
      }, 'your_secret_key', { expiresIn: tokenDurationInSeconds });
      console.log("before second emit");
      io.sockets.emit('tokenGenerated', token);
    }

  });

  const UserchangeStream = User.watch();
  UserchangeStream.on('change', async (change) => {
    console.log('A change occurred user :', change);

    const users = await User.find().select('id firstname lastname pseudo -_id');
    io.emit('usersChanged', users);


    
  });

});

// Définition des modèles
const User = mongoose.model('User', new mongoose.Schema({ id: String, firstname: String, lastname: String, pseudo: String}));
const Seat = mongoose.model('Seat', new mongoose.Schema({ id: String, id_user: String, id_movie: String}));
const Movie = mongoose.model('Movie', new mongoose.Schema({ id: String, name: String, length: Number}));


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
app.get('/movies', async (req, res) => {
  try {
      const movies = await Movie.find().select('id name length -_id'); // récupérer les champs
      res.send(movies);
  } catch (err) {
      res.status(500).send(err);
  }
});



  const port = 3000;
  server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  });