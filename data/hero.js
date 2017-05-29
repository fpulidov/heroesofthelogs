const pg = require('pg');
const conString = 'postgres://ejher:xxxxxx@localhost/heroesofthelogs'

module.exports = {
	insertHero: function(name)
	{
		var heroeName = name;
		console.log('Inserting new hero: ' + heroeName);
		pg.connect(conString, function (err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err)
		}//
		client.query('INSERT INTO heroe(name) VALUES($1)',
			[heroeName], function (err, result) {
				done()
				if (err) {
					return console.error('error happened during query', err)
					}
					return console.log('Insertion succesful')
					process.exit(0)
				})
				});
	},

	getHeroes: function()
	{
		//Initialize array
		var elem = [];
		console.log('Querying heroes');
		pg.connect(conString, function (err, client, done) 
		{
			if (err) 
			{
				return console.error('error fetching client from pool', err)
			}
			//Execute SELECT query
			client.query('SELECT name from heroe;', function (err, rows, result) 
			{
				//Iterate over results
				for (var i = 0; i < rows.rowCount; i++) 
				{
					//PUSH result into arrays
					elem.push(rows.rows[i].name);
				}
				done()
				if (err) 
				{
					return console.error('error happened during query', err)
				}
				console.log(elem);
				process.exit(0)
				return elem;
			})
		});
	}
   
}
