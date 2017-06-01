const pg = require('pg');
var blocked = require('blocked');
const conString = 'postgres://ejher:xxxxxx@localhost/heroesofthelogs'

module.exports = {
	insertHero: function(name)
	{
		var heroeName = name;
		console.log('Inserting new hero: ' + heroeName);
		pg.connect(conString, function (err, client, done) 
		{
			if (err) 
			{
				return console.error('error fetching client from pool', err)
			}
			client.query('SELECT name from heroe WHERE name LIKE $1' + ';',[heroeName], 
			function (err, rows, result)
			{

				console.log(rows.rows);
				if(rows.rows == '' && name != '')
				{

					client.query('INSERT INTO heroe(name) VALUES($1)',
					[heroeName], function (err, result) {
					done()
					if (err) {
						return console.error('error happened during query', err)
						}
						return console.log('Insertion succesful')
					})


				}else{
					console.log('Hero already exists or name is empty, aborting insertion');
					done()
				}
			});
		});
		pg.end();
	},

	getHeroes: function()
	{
		//Initialize array
		var elem = [];
		console.log('Querying heroes');
		return new Promise((resolve, reject) =>
		{

			pg.connect(conString, function (err, client, done) 
			{
				if (err) 
				{
					return console.error('error fetching client from pool', err)
				}
				//Execute SELECT query
				client.query('SELECT * from heroe ORDER BY name;', function (err, rows, result) 
				{
					//Iterate over results
					for (var i = 0; i < rows.rowCount; i++) 
					{
						//PUSH result into arrays
						elem.push(rows.rows[i]);
					}
					done()
					if (err) 
					{
						return console.error('error happened during query', err)
					}
					resolve(elem)
				})
			});

			pg.end();
			
		})
		
	}
   
}