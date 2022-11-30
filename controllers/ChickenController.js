const Chicken = require('../models/Chicken');
const moment = require('moment');

let ChickenController = {
    // Ajoute une poule à la base de données
    add: (req, res) => {
        const {weight, birthday, name, farmyard} = req.body
        const chicken = new Chicken({
            name,
            weight,
            birthday: birthday ? moment(birthday, 'DD-MM-YYYY').format() : Date.now(),
            ...(farmyard ? {farmyard} : {}),
        })
        chicken.save()
        .then((data) => {
            res.status(200).json({
                message: 'La poule a bien été ajoutée',
                data
            })
        })
        .catch((error) => {
            res.status(400).json({
                message: 'Une erreur est survenue',
                error
            })
        })
    },
    // retourne la liste des poules
    list: (req, res) => {
        Chicken
        .find()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            res.status(400).json({
                message: 'Une erreur est survenue',
                error
            })
        })
    },
    // retourne une poule selon l'ID communiqué
    find: async (req, res) => {
        const {id} = req.params
        try {
            const result = await Chicken.findById(id)
            const linkedResult = await Chicken.populate(result, { path: 'farmyard', select: ['title', 'maxQuantity']})
            
            res.status(200).json(linkedResult)
        } catch (error) {
            res.status(400).json({
                message: 'Une erreur est survenue',
                error
            })
        }        
    },
    // supprime une poule selon l'ID communiqué
    delete: (req, res) => {
        const {id} = req.params
    
        Chicken
        .findByIdAndDelete(id)
        .then((data) => {
            res.status(200).json({
                message: 'La poule a bien été supprimée',
                data
            })
        })
        .catch((error) => {
            res.status(400).json({
                message: 'Une erreur est survenue',
                error
            })
        })
    },
    // incrémente la valeur step d'une poule de 1 et met sa valeur isRunning sur true
    run: async (req, res) => {
        const {id} = req.body
        try {
            const chicken = await Chicken
            .findById(id)
            chicken.isRunning = true
            chicken.step += 1
    
            const data = await chicken.save()
            res.status(200).json({
                message: 'La poule a fait un pas',
                data
            })
        } catch (error){
            res.status(400).json({
                message: 'Une erreur est survenue',
                error
            })
        }
    },
    // remet la valeur step d'une poule à 0 et met sa valeur isRunning sur false
    stop: async (req, res) => {
        const {id} = req.body
    
        try {
            const chicken = await Chicken
            .findById(id)
            chicken.isRunning = false
            chicken.step = 0
            const data = await chicken.save()
            res.status(200).json({
                message: "La poule s'est arrêtée",
                data
            })
        } catch (error){
            res.status(400).json({
                message: 'Une erreur est survenue',
                error
            })
        }
    
    },
    // modifie une poule selon l'ID communiqué
    patch: (req, res) => {
        const {id} = req.params
        const {name, birthday, weight, farmyard} = req.body
    
        const editedFields = {
            ...(name ? {name} : {}),
            ...(birthday ? {birthday: moment(birthday, 'DD-MM-YYYY').format()} : {}),
            ...(weight ? {weight} : {}),
            ...(farmyard ? {farmyard} : {}),
        }
        Chicken
        .findByIdAndUpdate(id, editedFields)
        .then((data) => {
            res.status(200).json({
                message: 'La poule a bien été modifié',
                data
            })
        })
        .catch((error) => {
            res.status(400).json({
                message: 'Une erreur est survenue',
                error
            })
        })
    },
    // modifie une poule selon l'ID communiqué
    edit: (req, res) => {
        const {id} = req.params
        const {name, birthday, weight, farmyard} = req.body
    
        const editedFields = {
            ...(name ? {name} : {}),
            ...(birthday ? {birthday: moment(birthday, 'DD-MM-YYYY').format()} : {}),
            ...(weight ? {weight} : {}),
            ...(farmyard ? {farmyard} : {}),
        }
    
        Chicken
        .findByIdAndUpdate(id, editedFields)
        .then((data) => {
            res.status(200).json({
                message: 'La poule a bien été modifié',
                data
            })
        })
        .catch((error) => {
            res.status(400).json({
                message: 'Une erreur est survenue',
                error
            })
        })
    }
}

module.exports = ChickenController;