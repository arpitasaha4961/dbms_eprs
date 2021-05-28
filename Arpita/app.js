const express = require('express');
const mainRoutes = require('./routes/mainRoute.js');

const app = express();

// For parsing form data.
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/views', express.static(__dirname + '/views'));
app.use('', mainRoutes);

app.set('view engine', 'ejs');


app.listen(5000, () => console.log('The server is running'));
