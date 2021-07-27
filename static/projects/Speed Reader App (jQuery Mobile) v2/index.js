$(function() {
	
	//declare variables
	var myArray;
	var reading = false;
	var inputLength;
	var counter;
	var action;
	var frequency = 200;
	
	//on page load hide elements we don't need, leave only text area and start button
	$("#new").hide();
	$("#pause").hide();
	$("#resume").hide();
	$("#controls").hide();
	$("#result").hide();
	$("#error").hide();
	
	//click on Start Reading
	$("#start").click(function() {
		//get text and split it to words inside an array
		//\s matches spaces, tabs, new lines, etc. and + means one or more
		myArray = $("#userInput").val().split(/\s+/);
		
		//get the number of words
		inputLength = myArray.length;
		
		//check if number of words is too small
		if(inputLength > 1) {
			//change reading mode
			reading = true;
			
			//show controls
			$("#controls").show();
			
			//show reading box
			$("#result").show();
			
			//hide start, userInput, error message
			$("#start").hide();
			$("#userInput").hide();
			$("#error").hide();
			
			//show new, pause, resume
			$("#new").show();
			$("#pause").show();
			
			//set maximum of progress slider equal to amount of words
			$("#progressslider").attr("max", inputLength-1);
			
			//set counter to 0
			counter = 0;
			
			//show reading box
			$("#result").show();
			
			//show first word in reading box
			$("#result").text(myArray[counter]);
			
			//start reading using setInterval function to dispay each word
			action = setInterval(read, frequency);
			
			
			
		} else {
			$("#error").show();
		}
		
		
		
		
		
	});
	
	//Click on new
	$("#new").click(function() {
		//reload page
		location.reload();
	});
	
	//Click on Pause
	$("#pause").click(function() {
		//stop reading
		clearInterval(action);
		
		//change reading mode
		reading = false;
		
		//hide pause button
		$(this).hide();
		
		//show resume button
		$("#resume").show();
		
	});
	
	//Click on Resume
	$("#resume").click(function() {
		
		//start reading
		action = setInterval(read, frequency);
		
		//change reading mode
		reading = true;
		
		//hide resume button
		$(this).hide();
		
		//show pause button
		$("#pause").show();
	});
	
	//Change fontSize
	$("#fontsizeslider").on("slidestop", function(event, ui) {
		
		//refresh slider
		$("#fontsizeslider").slider("refresh");
		
		//get slider value
		var slidervalue = parseInt($("#fontsizeslider").val());
		
		//use slider to change font size of words in box
		$("#result").css("fontSize", slidervalue);
		
		//change value of font size span
		$("#fontsize").text(slidervalue);
	});
	
	//change speed
	$("#speedslider").on("slidestop", function(event, ui) {
		
		//refresh slider
		$("#speedslider").slider("refresh");
		
		//get slider value
		var slidervalue = parseInt($("#speedslider").val());
		
		//change speed span text
		$("#speed").text(slidervalue);
		
		//stop reading
		clearInterval(action);
		
		//change frequency
		frequency = 60000 / slidervalue;
		
		//resume reading if we are in reading mode
		if(reading) {
			action = setInterval(read, frequency);
		}
	});
	
	//progress slider
	$("#progressslider").on("slidestop", function(event, ui) {
		
		//refresh slider
		$("#progressslider").slider("refresh");
		
		//get slider value
		var slidervalue = parseInt($("#progressslider").val());
		
		//stop reading
		clearInterval(action);
		
		//change counter
		counter = slidervalue;
		
		//change word
		$("#result").text(myArray[counter]);
		
		//change progress % span text
		$("#percentage").text(Math.floor(counter/(inputLength-1)*100));

		//resume reading
		if(reading) {
			action = setInterval(read, frequency);
		}
		
		
	});
	
	//functions
	function read() {
		//check if we reached the last word
		if(counter == inputLength-1) {
			//stop reading
			clearInterval(action);
			//change reading mode
			reading = false;
			//hide pause button
			$("#pause").hide();
			
		} else {
			//counter goes up by one
			counter++;
			
			//show next word in array
			$("#result").text(myArray[counter]);
			
			//access progress slider and change value to equal the counter and refresh slider
			$("#progressslider").val(counter).slider("refresh");
			
			//calculate progress percentage and change value of span
			$("#percentage").text(Math.floor(counter/(inputLength - 1)*100));
			
		}
		
	};
	
	
	
	
});