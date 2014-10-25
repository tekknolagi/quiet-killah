function sleep(millis, callback) {
    setTimeout(function()
            { callback(); }
    , millis);
}

function spazBg(color) {
	$("body").css({'background-color':color});
	sleep(275, function(){
		$("body").css({'background-color':'white'});
	});
}

$(document).ready(function () {
	$("#text-input").focus();
	var classesObj = {};

	$( "#form" ).submit(function( event ) {
		event.preventDefault();
	 	var value = $("#text-input").val();

	 	if (!classesObj[value] && value.length > 0) {
		 	$.ajax({
		  		type: "GET",
		  		url: "/api/rank",
		  		data: {call_num: value},
		  		success: function (data) {
		  			$( ".class-collection" ).prepend('<span class="rank">' + data.rank + "</span>  " + value+"<br>");
		  			classesObj[value] = data.rank;
		  			var newVal = parseInt($("#submit_btn").val()) + data.rank;
		  			$("#submit_btn").val(newVal);
		  			spazBg('#2BE037');

		  		},
		  		error: function () {
		  			console.log("WUTANG CLAN AINT NUTTIN TO FUXWIT");
					spazBg('red');		  			
		  		},
		  		dataType: 'json'
		  	});
	 	}
	 	$("#text-input").val('');
	});	
});