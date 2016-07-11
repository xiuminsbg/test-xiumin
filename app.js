const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./config/routes');

// created index.ejs file and views folder
app.set('views', './views');
app.set('view engine', 'ejs');

// Middleware: telling Express to use a function with a request, respond, next object. Request to a certain path, via a request method from a certain request IP
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// this requires you to input ../api/.. in the URL. It will prefixed /api/ in your URL
app.use('/candies/', router);

// How we specify routes in Express
app.get('/', (req, res) => {
  res.render('index', {title: 'Candies Database'});
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
