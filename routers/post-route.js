const express = require('express');

const db = require('../data/helpers/postDb.js');
const router = express.Router();


router.get('/', async (req, res) => {
    try{
        const posts = await db.get();
            res.status(200).json(posts);
    }
     catch (error)  {
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
  });

// findById

  router.get('/:id', async (req, res) => {
    
    try {
        const post = await db.getpostPosts(req.params.id);
        if (!post) {
            res
              .status(404)
              .json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(post);
          }
   
    }
    catch (error) {
        res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    }
});



// post / insert
  router.post("/", async(req, res) => {
      
    if (req.body.name) {
        try {
          const post = await db.insert(req.body);
          res.status(201).json(post);
              
          } catch (error) {
            res
            .status(500)
            .json({ error: "The post information could not be retrieved." })
        }          
    }  else {
        res.status(400).json({ errorMessage: "Please provide name for the post." });
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
            res.status(404).json({ message: "The post with the specified ID does not exist." });    
        }
      })
      .catch(error => {
        res.status(500).json({ error: "The post could not be removed" });
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
        res.status(400).json({ errorMessage: "Please provide name to the post." });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      } 
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be modified." });
    });
});



  module.exports = router;