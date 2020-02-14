const express = require('express');

const projectRouter = require("./data/routers/projectRouter");
const actionRouter = require("./data/routers/actionRouter");

const server = express();

server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


const port = 5000;

server.listen(port, () => {
    console.log(`\n *** Server is Running on port ${port} *** \n`);
})