const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const config = require('./DB.js');
const entriesRoute = require('./routes.js');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true}).then(
    () => {console.log('Database is connected')},
    err => {console.log(`Can not connect to database ${err}`)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/entries', entriesRoute);

app.listen(PORT, function(){
    console.log('Server is running on port:',PORT);
});