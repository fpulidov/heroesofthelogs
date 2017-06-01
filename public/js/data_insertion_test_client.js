$(function()
{
	$('#accept').on('click', function(e)
	{
		var parameters = document.getElementById('heroeName').value;
		$.get( '/heroeinsert','heroeName='+parameters);
		document.getElementById('heroeName').value = '';
	});
});