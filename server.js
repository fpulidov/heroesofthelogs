var bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const http = require('http');
const port = 8000;
var hero = require('./data/hero.js');

const requestHandler = (request, response) => {
	console.log(request.url)
	response.end('Server ending')
}

app.use(express.static('public'));

app.get('/', (request, response) => 
{
	response.sendFile(path.join(__dirname, '/view/index.html'));
	hero.getHeroes();
	console.log('Index requested, retrieving heroes');
})

app.get('/heroe', (request, response) => {
	response.sendFile(path.join(__dirname, '/view/insert_heroe.html'));
	console.log('heroe insertion test requested');
	})


//Hero insertion for testing purposes
app.get('/heroeinsert', (request, response) => {
	hero.insertHero(request.query.heroeName);
})

app.listen(port, (error) =>
{
	if (error) {
		return console.log('Error ocurred', error)
	}
	console.log('Server listening')
})
