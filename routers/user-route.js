const express = require('express');

const db = require('../data/helpers/userDb.js');
const router = express.Router();


// // find
router.get('/', async (req, res) => {
    try{
        const users = await db.get();
            res.status(200).json(users);
    }
     catch (error)  {
        res.status(500).json({ error: "The user information could not be retrieved." });
    }
  });

// findById

  router.get('/:id', async (req, res) => {
    
    try {
        const user = await db.getUserPosts(req.params.id);
        if (!user) {
            res
              .status(404)
              .json({ message: "The user with the specified ID does not exist." });
            } else {
                res.status(200).json(user);
          }
   
    }
    catch (error) {
        res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    }
});



// user / insert
  router.post("/", async(req, res) => {
      
    if (req.body.name) {
        try {
          const user = await db.insert(req.body);
          res.status(201).json(user);
              
          } catch (error) {
            res
            .status(500)
            .json({ error: "The post information could not be retrieved." })
        }          
    }  else {
        res.status(400).json({ errorMessage: "Please provide name for the user." });
      }
    
  });


// // Delete 

  router.delete("/:id", (req, res) => {
      
    const id = req.params.id;  
    db
      .remove(id)
      .then(remove => {
          if (remove) {
          res.status(204).end(); 
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });    
        }
      })
      .catch(error => {
        res.status(500).json({ error: "The user could not be removed" });
      });
  });


// // Update

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else if (!update.name){
        res.status(400).json({ errorMessage: "Please provide name to the user." });
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      } 
    })
    .catch(error => {
      res.status(500).json({ error: "The user information could not be modified." });
    });
});


  module.exports = router;