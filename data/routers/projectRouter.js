const express = require('express');

const Projects = require('../helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "You made it to project router!" });
}) 

router.get('/:id', verifyProjectId, (req, res) => {
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

router.put('/:id', verifyProjectId,  (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "Could not update project" });
    })
})

router.delete('/:id', verifyProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "Could not delete Project" });
    })
})

router.get('/:id/actions', verifyProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "Could not get actions for that project" });
    })
})

module.exports = router;

function verifyProjectId( req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
            if(!project){
                res.status(404).json({ message: "Invalid Project ID" })
            } else {
                console.log('valid project id');
                next();
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Could not get project of that id" })
        })
    }
