//NOTE: This is not my original code. 
//I found this snippet on a website titled Dev Ingredients. http://devingredients.com/2011/11/building-an-extensible-jquery-countdown-plugin-from-scratch
//Dev Ingredients is managed by Catalin Berta. 

function setCountdown(now, endDate){
	(function($) {
	  $.fn.countdown = function(options, callback) {
	   

	    //custom 'this' selector
	    thisEl = $(this); 
	  
	    // array of custom settings
	    var settings = { 
	      'date': null ,
	      'format': null,
	    };

	    // append the settings array to options
	    if(options) {
	      $.extend(settings, options);
	    }

	    //create the countdown processing function
	    function countdown_proc(currentDate) {

	    var eventDate = Date.parse(settings.date) / 1000;
	    
	    
	    if(eventDate <= currentDate) {
	    callback.call(this);
	    clearInterval(interval);
	    }
	      
	    var seconds = eventDate - currentDate;
	    
	    var days = Math.floor(seconds / (60 * 60 * 24)); 
	    //calculate the number of days
	    
	    seconds -= days * 60 * 60 * 24; 
	    //update the seconds variable with number of days removed
	    
	    var hours = Math.floor(seconds / (60 * 60));
	    seconds -= hours * 60 * 60; 
	    //update the seconds variable with number of hours removed
	    
	    var minutes = Math.floor(seconds / 60);
	    seconds -= minutes * 60; 
	    //update the seconds variable with number of minutes removed
	    
	    //conditional statements
	    if (days == 1) { thisEl.find(".timeRefDays").text("Dia"); } else { thisEl.find(".timeRefDays").text("Dias"); }
			    if (hours == 1) { thisEl.find(".timeRefHours").text("Hora"); } else { thisEl.find(".timeRefHours").text("Horas"); }
			    if (minutes == 1) { thisEl.find(".timeRefMinutes").text("Minuto"); } else { thisEl.find(".timeRefMinutes").text("Minutos"); }
			    if (seconds == 1) { thisEl.find(".timeRefSeconds").text("Segundo"); } else { thisEl.find(".timeRefSeconds").text("Segundos"); }
	    
	    //logic for the two_digits ON setting
	    if(settings.format == "on") {
	        days = (String(days).length >= 2) ? days : "0" + days;
	        hours = (String(hours).length >= 2) ? hours : "0" + hours;
	        minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
	        seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
	    }
	    
	    //update the countdown's html values.
	    thisEl.find(".days").text(days);
	    thisEl.find(".hours").text(hours);
	    thisEl.find(".minutes").text(minutes);
	    thisEl.find(".seconds").text(seconds);
	  }

		//run the function
		//countdown_proc();
		
		
		//parmetro de fechaHora actual
		//var currentTimeMillis = $("#now").html();
		var currentTimeMillis =now;
		var currentDate = Math.floor(currentTimeMillis/ 1000);
		//loop the function
		interval = setInterval(
			function(){
				countdown_proc(currentDate);
				currentDate = currentDate + 1;
			},
			1000);
		//interval = setInterval(countdown_proc, 1000);
	  };

	})(jQuery);

	$("#countdown").countdown({
		date: endDate, // add the countdown's end date (i.e. 3 november 2012 12:00:00)
		format: "on" // on (03:07:52) | off (3:7:52) - two_digits set to ON maintains layout consistency
	});
}