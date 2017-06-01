const pg = require('pg');
var blocked = require('blocked');
var bcrypt = require('bcrypt');
const conString = 'postgres://ejher:xxxxxx@localhost/heroesofthelogs'

module.exports = {

	register: function(user,email,password)
	{
		var username = user;
		var mail = email;
		var saltRounds = 10;
		var unEncPassword = password;
		bcrypt.hash(unEncPassword, saltRounds, function(err, hash) 
		{
			if(err)
			{
				console.log('Registering user: ' + username + " with email: " + mail + ' unencpass ' + unEncPassword);
				return console.error('error while hashing ' + err)
			}
			pg.connect(conString, function (err, client, done)
			{
				if (err) 
				{
					return console.error('error fetching client from pool', err)
				}
				client.query('SELECT * from users WHERE email LIKE $1;',[mail], 
					function (err, rows, result)
					{
						if("undefined" === typeof result)
						{
							if (err) 
							{
								return console.error('error while selecting', err)
							}else
							{
								console.log('Registering user: ' + username + " with email: " + mail + ' and password ' + hash);
								client.query('INSERT INTO users(username,email,password) VALUES($1,$2,$3);'),
								[username,mail,hash], function (err, result) 
								{
									if (err) 
									{
										return console.error('error while inserting', err)
									}
									done()
								}

							}




						}else{
							console.log('User email already registered');
							done()
						}
					});
			});
		});
		pg.end();
	}
}