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
app.use(express.json()); // Ajouter cette ligne
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://192.168.1.7:8080');
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
    
    
    
    if (seat && seat.id_user != null && seat.id_movie != null) {
      if (movie) { // Ajoutez cette ligne
        const tokenduration = movie.length;
        const tokenDurationInSeconds = tokenduration * 60;
        const token = jwt.sign({
          id: seat._id,
          id_user: seat.id_user,
          id_movie: seat.id_movie,
        }, 'your_secret_key', { expiresIn: tokenDurationInSeconds });
        console.log("before second emit");
        io.sockets.emit('tokenGenerated', { token, expiresIn: tokenDurationInSeconds });
        
        setTimeout(async () => {
          console.log('Token for seat ${seat.id} expired, resetting user and movie');
          const seatToUpdate = await Seat.findOne({ id: seat.id });
          if (seatToUpdate) {
            seatToUpdate.id_user = null;
            seatToUpdate.id_movie = null;
            await seatToUpdate.save();
          }
        }, tokenDurationInSeconds * 1000); // Convertir les secondes en millisecondes pour setTimeout

      }else {
        // Si id_user ou id_movie est null, émettez un token expiré
        const token = jwt.sign({}, 'your_secret_key', { expiresIn: 0 });
        io.sockets.emit('tokenGenerated', { token, expiresIn: 0 });
      }
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
const User = mongoose.model('User', new mongoose.Schema({ id: String, firstname: String, lastname: String, pseudo: String, mail: String, soundProfile: String, language: String, volume: String}));
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

app.put('/user/:id', async (req, res) => {
  try {
      console.log(`Requête reçue pour mettre à jour l'utilisateur ${req.params.id}`);
      const user = await User.findOne({ id: req.params.id });
      console.log(`Utilisateur trouvé: `, user);
      if (!user) {
          return res.status(404).send('Utilisateur non trouvé');
      }

      // Mise à jour du volume si présent dans la requête
      if (req.body.volume !== undefined) {
          console.log(`Type du volume de l'utilisateur avant la mise à jour: ${typeof user.volume}`);
          user.volume = req.body.volume;
          console.log(`Volume de l'utilisateur mis à jour: `, user.volume);
          console.log(`Type du volume de l'utilisateur après la mise à jour: ${typeof user.volume}`);
      }

      // Mise à jour de la langue si présent dans la requête
      if (req.body.language !== undefined) {
          console.log(`Langue de l'utilisateur avant la mise à jour: ${user.language}`);
          user.language = req.body.language;
          console.log(`Langue de l'utilisateur mis à jour: `, user.language);
      }

      await user.save();
      console.log(`Utilisateur enregistré: `, user);
      res.send(user);
  } catch (err) {
      console.log(`Erreur lors de la mise à jour de l'utilisateur: `, err);
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

app.get('/seat/:id', async (req, res) => {
  try {
      const seat = await Seat.findOne({ id: req.params.id }); // rechercher le siège par id
      if (seat) {
          const user = await User.findOne({ id: seat.id_user }); // rechercher l'utilisateur par id
          res.send(user); // envoyer les informations de l'utilisateur
      } else {
          res.status(404).send('Seat not found');
      }
  } catch (err) {
      res.status(500).send(err);
  }
});
<<<<<<< Updated upstream
=======




>>>>>>> Stashed changes
  const port = 3000;
  server.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
  });
