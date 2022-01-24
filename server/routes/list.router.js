const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req,res) => {
    const queryText = 'SELECT * FROM "list" ORDER BY "categories";';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error)=> {
        console.log('there was an error, which is: ', error);
        res.sendStatus(500);
    })

});

router.post('/', (req,res) => {
    const newTask = req.body;
    console.log('Posting a new task: ', newTask);
    const queryText = ` INSERT INTO "list" (categories, task, due) 
    VALUES ($1, $2, $3);`;
    console.log(queryText);
    pool.query(queryText, [newTask.categories, newTask.task, newTask.due]).then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('You have a SQL error', error);
        res.sendStatus(500);
    })
})

router.put('/:id', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    let queryText ='';
    console.log(req.body.complete);
    
    if (req.body.complete === 'true' ){
      queryText = `UPDATE "list" SET "complete"='false' WHERE id=$1`;
    }else{
      queryText = `UPDATE "list" SET "complete"='true' WHERE id=$1`;
    }
    pool.query(queryText, [req.params.id]).then(() => {
       res.sendStatus(200);
    }).catch((error) => {
       console.log(error);
       res.sendStatus(500);
    })
})

router.delete('/:id',(req,res) => {
    console.log(req.params);
    const listid = req.params.id;
    const queryText = 'DELETE FROM "list" WHERE id=$1;';
    pool.query(queryText, [listid]).then((result) => {
      res.sendStatus(204);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    })
  });

module.exports = router;