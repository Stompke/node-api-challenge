const express = require('express');

const Projects = require('../helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "You made it to project router!" });
}) 

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({ error: 'Could not retrieve that project'})
    })
})

router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "Could not add project" });
    })
})

router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "Could not update project" });
    })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "Could not delete Project" });
    })
})

module.exports = router;