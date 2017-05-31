var bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const http = require('http');
const port = 8000;
var hero = require('./data/hero.js');

app.set('views', './view')
app.set('view engine', 'jade');
app.use(express.static('public'));

const requestHandler = (request, response) => {
	console.log(request.url)
	response.end('Server ending')
}

app.get('/', (request, response) => 
{
	response.sendFile(path.join(__dirname, '/view/index.html'));
	console.log('Index requested, retrieving heroes');
})

app.get('/heroload', (request, response) => 
{
	console.log('Index requested, retrieving heroes');
	hero.getHeroes();
})

app.get('/heroe', (request, response) => 
{
	response.sendFile(path.join(__dirname, '/view/insert_heroe.html'));
	console.log('heroe insertion test requested');
})

app.get('/jade', (request, response) => 
{
	var heroList = [];
	hero.getHeroes().then(data=>
	{
   		heroList = data;
   		console.log(heroList)
    	response.render('test_jade', {param1: heroList});
	}).catch(e=>{
        //handle error case here when your promise fails
        console.log(e)
    });
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
