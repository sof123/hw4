var currentLevel = 1;

var currentScore = 0;

var timeBonus = 200;

var numLevels = 10;

var a = "http://images.clipartpanda.com/apple-clipart-apple5.png";
var b = "http://kurld.com/images/wallpapers/ball/ball-12.png";
var c = "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_March_2010-1.jpg";
var d = "https://www.what-dog.net/Images/faces2/scroll0015.jpg";
var e = "https://s-media-cache-ak0.pinimg.com/736x/33/2e/f8/332ef8d886bd822b0d9cf20ee5a112c9.jpg";
var f = "http://www.drodd.com/images13/football11.png";
var g = "https://thoroughlyreviewed.com/wp-content/uploads/2015/05/Golf-Ball1-300x300.jpg";
var h = "http://allhailtheblackmarket.com/wp-content/uploads/2015/08/1plain.png"
var i = "http://images.realfoodtoronto.com/D.cache.large/Jalapeno-Pepper.jpg"
var j = "http://images.clipartpanda.com/kite-clipart-large-Kite-33.3-13491.png"

var picArray = [a,b,c,d,e,f,g,h,i,j];

var flashPicsInterval;

var count = 0;

//order pf pics user selected
var pickedPics = [];

//which element is being displayed
var whichToDisplay = Math.floor(Math.random() * numLevels);	

var pickedIndex = 0;

//correct order of objects
var order = [];


init();
playLevel(currentLevel);



function playLevel(level)
{
	console.log("in play")
	console.log("weird number is " + (numLevels / (numLevels*6)) * 1000 + (2000 - currentLevel*150));

	flashPicsInterval = setInterval(display, (numLevels / (numLevels*6)) * 1000 + (2000 - currentLevel*100) , order);
	
	
	
	
}

function display ()
{
	if (count < currentLevel)
	{

		whichToDisplay = (whichToDisplay + Math.floor(Math.random() * numLevels)) % numLevels;
		order.push(picArray[whichToDisplay]);

		//pause between pics, change to black
		setTimeout(document.getElementById("currentPic").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_Afghanistan_(1880%E2%80%931901).svg/2000px-Flag_of_Afghanistan_(1880%E2%80%931901).svg.png" , 500)
		
		document.getElementById("currentPic").src = picArray[whichToDisplay];	
		console.log(document.getElementById("currentPic").src);	
		count++;		
	}
	else
	{
		clearInterval(flashPicsInterval);
		document.getElementById("selectionTable").style = "visibility: visible"
		document.getElementById("displayTable").style = "visibility: hidden"
		
		
	}
	
	
}

function init()
{
	var letter = "a";
	
	setInterval(decrementTime, 1000);
	
	document.getElementById("levelId").innerHTML = String("Current level: "  + currentLevel);
	
	for (var i = 0; i < numLevels;i++)
	{
		document.getElementById(letter).src = picArray[i];		
		letter = String.fromCharCode(letter.charCodeAt() + 1);
	}
	document.getElementById("submitButton").onclick = 
	function()
	{
		for (var j = 0; j < order.length;j++)
		{
			if (!(pickedPics[j] === order[j]))
			{
				//you lose
				window.location.href = "lose.html";
			}
		}
		
		//you win
		if (currentLevel == numLevels)
		{
			currentScore+=timeBonus;
			alert("You win. Your score: " + currentScore)
			window.location.href = "win.html";
		}
		getReadyToPlayNextLevel()
		playLevel(currentLevel);
	}
	
}


function addToPicked(index)
{
	pickedPics.push(picArray[index]);
	document.getElementById(String(pickedIndex)).src = picArray[index];
	pickedIndex++;
	console.log(pickedPics)
}

function getReadyToPlayNextLevel()
{
	currentScore+=currentLevel*5
	currentLevel++;
	document.getElementById("levelId").innerHTML = String("Current level: "  + currentLevel);
	document.getElementById("scoreId").innerHTML = String("Current score: "  + currentScore);
	count = 0;
	whichToDisplay = 0;
	order = [];
	document.getElementById("currentPic").src = "";
	pickedIndex = 0;
	pickedPics = [];
	document.getElementById("selectionTable").style = "visibility: hidden";
	document.getElementById("displayTable").style = "visibility: visible";
	
	//clear selections
	for (var i = 0; i< numLevels;i++)
	{
		document.getElementById(String(i)).src = "";
	}
	
}

function decrementTime()
{
	if (timeBonus > 0)
	{
		timeBonus--;
	}
	document.getElementById("timeId").innerHTML = String("Time Bonus Remaining: "  + timeBonus);
	
}