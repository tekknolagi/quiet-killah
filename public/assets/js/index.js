function sleep(millis, callback) {
    setTimeout(function()
            { callback(); }
    , millis);
}

function spazBg(color) {
	$("body").css({'background-color':color});
	setTimeout(function() {
		$("body").css({'background-color':'white'});
	}, 175);
}

$(document).ready(function() {
	var callNums = [];
	var classRanks = {}
	var alreadyAdded = {};

	// Get the list of all callnums
	$.ajax({
		type: "GET",
		url: "/api/ranks",
		success: function (data) {
			$.each(data.classes, function (id, el) {
				callNums.push(id);
				classRanks[id] = el;
			});
		}
	});

	// Get the best possible class
	var best;
	$.ajax({
		type: "GET",
		url: "/api/best",
		success: function (data) {
			console.log(data);
			best = '<span class="rank rank-best">'+data.rank+'</span>  <span class="class-best">'+data.class+'</span>';

			// Now get the worst class
			$.ajax({
				type: "GET",
				url: "/api/worst",
				success: function (data) {
					$(".best-worst-ticker").prepend(best + "&nbsp;&nbsp;|&nbsp;&nbsp;" + '<span class="rank rank-worst">'+data.rank+'</span>   <span class="class-worst">'+data.class+'</span>');
				}
			});
		}
	});

	$( "#form" ).submit(function( event ) {
		event.preventDefault();
	 	var value = $("#text-input").val();
	 	var rank = classRanks[value];
	 	var isAdded = alreadyAdded[value];

	 	if (rank && !isAdded) {
			$( ".class-collection" ).prepend('<span class="rank">' + rank + "</span>  " + value + "<br>");
			$("#submit_btn").val(parseInt($("#submit_btn").val()) + rank);
			alreadyAdded[value] = true;
	 	}
	 	else if (alreadyAdded[value]) {
	 	}
	 	else {
	 		spazBg('red');
	 	}
	 	$("#text-input").val('');
	 	$("#text-input").focus();
	 	$('.tt-dropdown-menu').css({'display':'none'});
	});	

	var substringMatcher = function(strs) {
	  return function findMatches(q, cb) {
	    var matches, substrRegex;
	 
	    // an array that will be populated with substring matches
	    matches = [];
	 
	    // regex used to determine if a string contains the substring `q`
	    substrRegex = new RegExp(q, 'i');
	 
	    // iterate through the pool of strings and for any string that
	    // contains the substring `q`, add it to the `matches` array
	    $.each(strs, function(i, str) {
	      if (substrRegex.test(str)) {
	        // the typeahead jQuery plugin expects suggestions to a
	        // JavaScript object, refer to typeahead docs for more info
	        matches.push({ value: str });
	      }
	    });
	 
	    cb(matches);
	  };
	};
	 
	$("#text-input").focus();
	 
	$('.typeahead').typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'callNums',
		displayKey: 'value',
		source: substringMatcher(callNums)
	});
});