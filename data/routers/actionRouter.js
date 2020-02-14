const express = require('express');

const router = express.Router();

const Actions = require('../helpers/actionModel');

router.get('/', (req, res) => {
    
    res.status(200).json({ message: "You made it to action router!" });
}) 

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({ error: "Could not get that action" })
    })
})


router.post('/', (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: "Could not add action" });
    })
})

module.exports = router;