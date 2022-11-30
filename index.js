const express = require('express');
const mongoose = require('mongoose')

var bodyParser = require('body-parser')

const ChickenController = require('./controllers/ChickenController');
const FarmyardController = require('./controllers/FarmyardController');

const app = express()


const database_url = 'mongodb+srv://admin:ofItNjEUeI2ywUTW@cluster0.u4swj.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(database_url).then((res) => {
    app.listen(3000)
})
.catch((err) => {
    console.log(err)
})

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Ajoute un poulaillier à la base de données
app.post('/add-farmyard', FarmyardController.add)

// Modifie un poulaillier selon l'ID communiqué
app.put('/edit-farmyard/:id', FarmyardController.edit)

// Retourne un poulaillier selon l'ID communiqué
app.get('/farmyard/:id', FarmyardController.find)

// Ajoute une poule à la base de données
app.post('/add-chicken', ChickenController.add)

// retourne la liste des poules
app.get('/chickens', ChickenController.list)

// retourne une poule selon l'ID communiqué
app.get('/chicken/:id',  ChickenController.find)

// supprime une poule selon l'ID communiqué
app.delete('/delete-chicken/:id', ChickenController.delete)

// incrémente la valeur step d'une poule de 1 et met la valeur isRunning sur true
app.post('/chicken/run', ChickenController.run)

// remet la valeur step d'une poule à 0 et met sa valeur isRunning sur false
app.post('/chicken/stop', ChickenController.stop)

// modifie une poule selon l'ID communiqué
app.patch('/patch-chicken/:id', ChickenController.patch)

// modifie une poule selon l'ID communiqué
app.put('/edit-chicken', ChickenController.edit)