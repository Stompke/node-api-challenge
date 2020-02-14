const express = require('express');

const router = express.Router();

const Actions = require('../helpers/actionModel');

router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({ error: "Could not get all actions" })
    })
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

router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: "Could not update action" });
    })
})

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: "Could not delete Action" });
    })
})

module.exports = router;