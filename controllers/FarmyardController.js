const Farmyard = require('../models/Farmyard');

let FarmyardController = {
    // Ajoute un poulaillier à la base de données
    add: (req, res) => {
        const {title, maxQuantity} = req.body
        const chicken = new Farmyard({
            title,
            maxQuantity
        })
        chicken.save()
        .then((data) => {
            res.status(200).json({
                message: 'Le poulailler a bien été ajouté',
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
    // Modifie un poulaillier selon l'ID communiqué
    edit: (req, res) => {
        const {id} = req.params
        const {title, maxQuantity} = req.body
    
        const editedFields = {
            ...(title ? {title} : {}),
            ...(maxQuantity ? {maxQuantity} : {}),
        }
    
        Farmyard
        .findByIdAndUpdate(id, editedFields)
        .then((data) => {
            res.status(200).json({
                message: 'La poulailler a bien été modifié',
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
    // Retourne un poulaillier selon l'ID communiqué
    find: (req, res) => {
        const {id} = req.params
        Farmyard
        .findById(id)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            res.status(400).json({
                message: 'Une erreur est survenue',
                error
            })
        })
    }
}

module.exports = FarmyardController;