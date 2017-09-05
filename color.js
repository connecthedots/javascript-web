var blocks = document.querySelectorAll(".blocks");
var mode = 6;
var colorsArray = new Array;
var pickedColor = document.querySelector("#rgb");
var response = document.querySelector("#response");
var newGame = document.querySelector("#new");
var header = document.querySelector("h1");
var chooseEasy = document.getElementById("easy");
var chooseHard = document.getElementById("hard");

setup();

function setup(){
	begin(mode);
	refreshGame(mode);
	newGame.addEventListener("click", function() {refreshGame(mode)});
}

function begin(mode){
	//Makes blocks responsive to user clicks
	for (var i=0; i<mode;i++){
		blocks[i].addEventListener("click", checkAnswer);
	}	
}

function checkAnswer(){
	var chosen = this.style.backgroundColor;
	//If user chose the right color	
	if (chosen === pickedColor.textContent){
		response.textContent = "You got it!";
		changeRightColor(mode);
		header.style.backgroundColor = pickedColor.textContent;
		newGame.textContent = "Play Again?";
	}
	//Otherwise, remove the tile
	else{
		this.style.backgroundColor = "#232323";
		response.textContent = "Try Again";
	}
}

function changeRightColor(mode){
	for (var i = 0; i < mode; i++)
		blocks[i].style.backgroundColor = pickedColor.textContent;
}

function addColor(mode){
	//Adds random colors into array
	colorsArray = [];
	for (var i=0; i<mode; i++){
		console.log("putting colors in array");
		var newRGB = "rgb(" + genRandom()+ ", " +genRandom()+", "+genRandom()+")";
		colorsArray.push(newRGB);
		console.log(colorsArray);
	}
	//Choose the color
	pickedColor.innerHTML = chosenColor();
	//Assigns color to squares
	for (var i=0; i<blocks.length;i++){
		if (colorsArray[i]== undefined){
			blocks[i].style.display = "none";
		}
		else{
			blocks[i].style.display = "";
			blocks[i].style.backgroundColor = colorsArray[i];
		}
	}	
}

function chosenColor(){
	var random = Math.floor(Math.random() * colorsArray.length);
	return colorsArray[random];
}

//Start new game, clear out colors array & header color
function refreshGame(mode){
	header.style.backgroundColor = "#0099cc";
	newGame.textContent = "New Colors";
	response.textContent = "";
	addColor(mode);	
}

//Generates random number from 0 to 255
function genRandom(){
	return String(Math.floor(Math.random()*(255))+1);
}

chooseEasy.addEventListener("click", function(){
	this.classList.add("highlighted");
	chooseHard.classList.remove("highlighted");
	mode = 3;
	refreshGame(mode);
})

chooseHard.addEventListener("click", function(){
	this.classList.add("highlighted");
	chooseEasy.classList.remove("highlighted");
	mode = 6;
	refreshGame(mode);
})