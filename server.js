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
    res.status(500).json({error: "Failed to add user"})
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
    res.status(500).json({error: "Failed to add user"})
  })
})
// ---DELETE requests ------////

//actions

// projects

// ---PUT requests ------////

//actions

// projects





//posts

//--Add user through Post
server.post('/users/:id',  (req, res) => {

  const username = req.body.name;
  if(!username){
    res.status(400).json({message: "Please provide a name for this user"})
  }
  userdb.insert(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "Failed to add user"})
  })
})
// //getting sql  constraint for duplicate names how to  handle this exception?
// // How to add with specified route id?
//
// //Delete User
// server.delete('/users/:id', (req, res) => {
//
//   const id = req.params.id;
//   userdb.remove(id)
//   .then(user => {
//     if(user === 0) {
//       res.status(400).json({ message: "please use a valid id"})
//     }
//     else{
//       res.status(200).json(user)
//     }
//     })
//     .catch(err =>{
//       console.log(err)
//       res.status(500).json({ error: "can't delete user" })
//   })
// })
//
//
// //Update User
// server.put('/users/:id', capatlize, (req, res) =>{
//
//   const id = req.params.id;
//   const name = req.body.name;
//   const body = req.body
//
//   if(!name){
//     res.status(400).json({error: "Please christen this poor virtual soul"})
//   }
//
//   userdb.update(id, body)
//   .then(user => {
//     if(user === 0){
//       res.status(400).json({message: 'This Id does not exist'})
//     }
//     else{
//       res.status(200).json(user)
//     }
//   })
//   .catch(err => {
//     console.log(err)
//     res.status(500).json({message: "Failed to update user, please discipline database accordingly"})
//   })
// })
//Listener
server.listen(8000, ( ) => console.log('\n == API on port 8000 =='))
