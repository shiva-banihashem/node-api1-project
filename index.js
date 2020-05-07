const express = require("express");
const shortid = require("shortid");
const server = express();

//middleware
server.use(express.json());

let users=[];
const port=5000;

server.get("/", (req, res) => {
    

    res.json({ message: "Hello node api1 project! " })
})

server.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`)
})
//create new user
server.post('/api/users',(req,res)=>{
   const newUser = req.body;
  try {
  if (!newUser.name || !newUser.bio) 
     res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
   
   else {
     newUser.id = shortid.generate();
     users.push(newUser);
     const found = users.find(user=>user.id === newUser.id);
     if (found)
       res.status(201).json(newUser);
     
   }
 }
 catch(error) {
    
     res.status(500).json({ errorMessage: "There was an error while saving the user to the database." })
}
})

//get all users

server.get('/api/users',(req,res)=>{
      
      try {
        res.status(200).json(users);
        
      }
      catch(error) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
      }
        
})

//Delete a user

server.delete('/api/users/:id',(req,res)=>{
  try {
    const {id}  = req.params;
    const found = users.find(user=>user.id === id);
    if (found){
      users = users.filter(user=> user.id !== id)
      res.status(200).json(found);
    }
    else if (!found) 
      res.status(404).json({message:"The user with the specified ID does not exist."})
  }
    catch(error)  {
      res.status(500).json({ errorMessage: "The user could not be removed." })
    }
})

//Get a user 
server.get('/api/users/:id',(req,res)=>{
    const {id} = req.params;
    
    let index = users.findIndex(user=>user.id === id);
  try {
    if(index !==-1){
      
      res.status(200).json(users[index])
    }
    else if (index === -1)
        res.status(404).json({message:"The user with the specified ID does not exist."})
    
    }    
  catch(error) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})

//Update a user
server.put('/api/users/:id',(req,res)=>{
    const {id} = req.params;
    const changes = req.body;
 try {
    if (!changes.name || !changes.bio) 
     res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    else
    {
      let index = users.findIndex(user=>user.id === id);
      
      if(index !==-1){
        changes.id = id;
        users[index]=changes;
        res.status(200).json(users[index])
      }
      else if (index === -1) {
        res.status(404).json({message:"The user with the specified ID does not exist."})
      }
    } 
 }
      catch(error) {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
      }
    
})