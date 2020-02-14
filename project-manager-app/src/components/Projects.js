import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Projects = () => {
    const [ projects, setProjects ] = useState([]);
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        completed: false
  })

  const onChangeHandler = e => {
      setNewProject({
                    ...newProject,
          [e.target.name]: e.target.value
        }
      )
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    useEffect(() => {
        axios
        .get('http://localhost:5000/api/projects')
        .then(res => {
            console.log(res)
            setProjects(res.data)
        })
        .catch(err => 
            console.log(err))
    },[])

    const addNewProject = () => {
        axios
        .post('http://localhost:5000/api/projects', newProject)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <>
            <h1>All Projects</h1>
            <div>
      <button type="button" onClick={handleOpen}>
        Add New Project
      </button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Add a new project</h2>

            <form onSubmit={addNewProject}>
                <input type='text' placeholder='name' name='name' value={newProject.name} onChange={onChangeHandler} />
                <input type='text' placeholder='description' name='description' value={newProject.description} onChange={onChangeHandler} />
                <button type='submit'>Add</button>
            </form>

          {/* <SimpleModal /> */}
        </div>
      </Modal>
    </div>
            {projects.map(item => <div key={item.id}><h2>{item.name}</h2><h3>{item.description}</h3><h4>{item.completed ? 'completed' : 'Not Completed'}</h4></div>)}
        </>
    )
}

export default Projects;