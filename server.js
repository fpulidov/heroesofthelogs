var bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const http = require('http');
const port = 8000;
var hero = require('./data/hero.js');
var register = require('./data/register.js');

app.set('views', './view')
app.set('view engine', 'jade');
app.use(express.static('public'));

const requestHandler = (request, response) => {
	console.log(request.url)
	response.end('Server ending')
}

app.get('/', (request, response) => 
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

app.get('/heroload', (request, response) => 
{
	hero.getHeroes();
	response.status(200);
})

app.get('/heroe', (request, response) => 
{
	response.sendFile(path.join(__dirname, '/view/insert_heroe.html'));
	response.status(200);
	console.log('heroe insertion test requested');
})

app.get('/register', (request, response) => 
{
	response.render('register');
	console.log('register');
})

app.get('/newuser', (request, response) => 
{
	
	register.register(request.query.email, request.query.username, request.query.password);
	console.log('register');
})


//Hero insertion for testing purposes
app.get('/heroeinsert', (request, response) => {
	hero.insertHero(request.query.heroeName);
	response.status(200);
})

app.listen(port, (error) =>
{
	if (error) {
		return console.log('Error ocurred', error)
	}
	console.log('Server listening')
})
