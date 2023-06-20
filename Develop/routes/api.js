const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const router = express.Router();
const fs = require('fs');

router.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'../db/db.json'));
})

router.post('/notes',(req,res) => {
    console.info(`${req.method} request recieved to add note`);
    console.log(req.body);
    const newNote = req.body;
    newNote['id'] = uuidv4();

    //Updates db.json file
    fs.readFile('./db/db.json', 'utf-8', (err,data) => {
        (err) ? console.error(err) : 
        db = JSON.parse(data)
        db.push(newNote)
        newFile = JSON.stringify(db);
        fs.writeFile('./db/db.json', newFile, (err) => {
            (err) ? console.err(err) : console.log('Wrote file')
        });
    });
})

router.delete('/notes/:id', (req,res) => {

    // looks up id in notes and removes that note from the db
    fs.readFile('./db/db.json', 'utf-8', (err,data) => {
        (err) ? console.error(err) :
        db = JSON.parse(data)

        // loop through items in file
        for(let i = 0; i < db.length; i++){
            if(db[i].id === req.params.id){
                // removes item with matching id from db
                db.splice(i,1);
                newFile = JSON.stringify(db);
                
                //re-writes file
                fs.writeFile('./db/db.json', newFile, (err) => {
                    (err) ? console.err(err) : console.log('Wrote file')
                });
            }
        } 
        console.log('Deleted item');
    });
})


module.exports = router;