$(function()
{
	$('#register').on('click', function(e)
	{
		var username = document.getElementById('username').value;
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		$.get( '/newuser','username='+username +'&email='+email+'&password='+password);
	});
});