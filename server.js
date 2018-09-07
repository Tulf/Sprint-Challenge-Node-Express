const express = require('express');
const server = express();
const actiondb = require("./data/helpers/actionModel.js")
const projectdb = require("./data/helpers/projectModel.js")
const cors = require("cors");




//middleware
server.use(express.json())

// function logger(req, res, next) {
//   console.log(`${req.method} to ${req.url}`);
//
//   next(); //calls the next middleware in the queue
// }


// for all
function userToUpperCase(req, res, next) {
  req.monkey = true
  next();
}
//for a particular user
function capatlize( req, res, next){
  req.body.name = req.body.name.toUpperCase();
  next();
}


//ask eric why you need req.monkey and note just a declared bolean value?

/*
reusable bit of captalization:
if(req.monkey) {users = users.map(each =>
    each.name.toUpperCase())
*/

//----------------routes: ------------------------//

// initial
server.get('/', (req, res) => {
  res.send('Hello')
})

// --Get all actions
server.get('/actions',  (req, res) => {

    const id = req.params.id;
    actiondb.get(id)
    .then(users => {
      if(users){
            res.status(200).json(users)
          }
            else{
              res.status(404).json({error: "could not get actions"})
            }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: 'Cannot Get actions'})
    })
})

//actions by id:
server.get('/actions/:id',  (req, res) => {

    const id = req.params.id;
    actiondb.get(id)
    .then(users => {
      if(users){
            res.status(200).json(users)
          }
            else{
              res.status(404).json({error: "could not get actions"})
            }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: 'Cannot Get actions'})
    })
})

//get all projects
server.get('/projects/',  (req, res) => {

    const id = req.params.id;
    projectdb.get(id)
    .then(users => {
      if(users){
            res.status(200).json(users)
          }
            else{
              res.status(404).json({error: "Could not find projects"})
            }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: 'Cannot Get projects'})
    })
})

//get all projects by id
server.get('/projects/:id',  (req, res) => {

    const id = req.params.id;
    projectdb.get(id)
    .then(users => {
      if(users){
            res.status(200).json(users)
          }
            else{
              res.status(404).json({error: "project does not exist"})
            }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: 'Cannot Get projects'})
    })
})

//--Get actions for a given project
server.get('/projects/actions/:project_id', (req,res) => {

  const project_id = req.params.project_id;

  projectdb
  .getProjectActions(project_id)
    .then(user => {
      if(user.length === 0){
        res.status(400).json({message: 'This id could not be found'})
      }
      else{
        res.status(200).json(user)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({error: "failed to get user"})
    })
})

// ---POST requests ------////

//actions
server.post('/actions/',  (req, res) => {

const {project_id, description, notes} = req.body;
  if(!project_id || !description || !notes){
    res.status(400).json({message: "Please provide a project_id, name and description for this project, thank you kindly"})
    console.log(req.body)
  }
  actiondb.insert({ project_id, description, notes })
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "Failed to add action"})
  })
})

// projects
server.post('/projects',  (req, res) => {

    const { name, description } = req.body
  if(!name || !description){
    res.status(400).json({message: "Please provide a name and a description for this project, thank you kindly"})
  }
  projectdb.insert({ name, description } )
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "Failed to add project"})
  })
})
// ---DELETE requests ------////

//actions
server.delete('/actions/:id', (req, res) => {

  const id = req.params.id;
  actiondb.remove(id)
  .then(user => {
    if(user === 0) {
      res.status(400).json({ message: "please use a valid id"})
    }
    else{
      res.status(200).json(user)
    }
    })
    .catch(err =>{
      console.log(err)
      res.status(500).json({ error: "can't delete action" })
  })
})
// projects
server.delete('/projects/:id', (req, res) => {

  const id = req.params.id;
  projectdb.remove(id)
  .then(user => {
    if(user === 0) {
      res.status(400).json({ message: "please use a valid id"})
    }
    else{
      res.status(200).json(user)
    }
    })
    .catch(err =>{
      console.log(err)
      res.status(500).json({ error: "can't delete project" })
  })
})
// ---PUT requests ------////

//actions
server.put('/actions/:id',  (req, res) =>{

  const id  = req.params.id
  const  { description, notes } = req.body;

  if(!description || !notes){
    res.status(400).json({error: "Please provide a new description and notes field"})
  }

  actiondb.update(id,  { description, notes })
  .then(user => {
    if(user === 0){
      res.status(400).json({message: 'This Id does not exist'})
    }
    else{
      res.status(200).json(user)
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "Failed to update action"})
  })
})
// projects
server.put('/projects/:id', (req, res) =>{

  const id  = req.params.id
  const  { name, description} = req.body;


  if(!name || !description){
    res.status(400).json({error: "Please provide a new name and decription for this project"})
  }

  projectdb.update(id, { name, description})
  .then(user => {
    if(user === 0){
      res.status(400).json({message: 'This Id does not exist'})
    }
    else{
      res.status(200).json(user)
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "Failed to update project"})
  })
})


//Listener
server.listen(8000, ( ) => console.log('\n == API on port 8000 =='))
