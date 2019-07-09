const express = require('express');
const entryRoutes = express.Router();

let EntryModel = require('./model');

//ADD route
entryRoutes.route('/add').post((req, res) => {
    let entries = new EntryModel(req.body);
    entries.save()
        .then(entries => {
            res.status(200).json({'entries': 'entry added successfully'});
        })
        .catch(err => {
            res.status(400).send('unable to save to database', err);
        });
});

//GET data route
entryRoutes.route('/').get((req, res) => {
    EntryModel.find((err, entries) => {
        if(err){
            console.log(err);
        } else {
            res.json(entries);
        }
    });
});

//DETAILS route
entryRoutes.route('/details/:id').get((req, res) => {
    let id= req.params.id;
    EntryModel.findById(id, (err, entries) => {
        res.json(entries);
    });
});

//EDIT route
entryRoutes.route('/edit/:id').get((req, res) => {
    let id= req.params.id;
    EntryModel.findById(id, (err, entries) => {
        res.json(entries);
    });
});

//UPDATE route
entryRoutes.route('/update/:id').post((req, res) => {
    EntryModel.findById(req.params.id, (err, entries) => {
        if (!entries) {
            res.status(404).send("data is not found")
        } else {
            entries.title = req.body.title;
            entries.author = req.body.author;
            entries.keywords = req.body.keywords;
            entries.body = req.body.body;
            entries.date = req.body.date;
            entries.save().then(entries => {
                res.json('update complete')
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});

//DELETE route
entryRoutes.route('/delete/:id').get((req, res) => {
    EntryModel.findByIdAndRemove({_id: req.params.id}, (err, entries) => {
        if(err){
            res.json(err);
        } else {
            res.json('successfully removed');
        }
    });
});

module.exports = entryRoutes;