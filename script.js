// a key map of allowed keys
var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};

// audio for playing music
var audio = new Audio("./music/cheatmusic.mp3");

// the 'official' Konami Code sequence
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
var mobileKonamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];

// a variable to store the touch sequence for mobile devices
let touchSequence = [];

// a variable to remember the 'position' the user has reached so far.
var konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
  // get the value of the key code from the key map
  var key = allowedKeys[e.keyCode];
  // get the value of the required key from the konami code
  var requiredKey = konamiCode[konamiCodePosition];

  // compare the key with the required key
  if (key == requiredKey) {

    // move to the next key in the konami code sequence
    konamiCodePosition++;

    // if the last key is reached, activate cheats
    if (konamiCodePosition == konamiCode.length) {
      activateCheats();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

// add touch event listeners for mobile devices
document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchend", handleTouchEnd);

// Variables to store the start and end coordinates of the touch
let startX, startY, endX, endY;


window.onload = function() {
  includeHTML();
};

// Function to activate cheats
function activateCheats() {
  audio.play();

  var cheatSection = document.getElementById("cheatCode");
  cheatSection.hidden = false;
  var content = document.getElementById("wrapper");
  content.hidden = true;
}

// Function to handle touch start event
function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

// Function to handle touch end event
function handleTouchEnd(event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;

    let direction = getSwipeDirection(startX, startY, endX, endY);
    if (direction) {
        touchSequence.push(direction);
        checkMobileKonamiCode();
    }
}

// Function to determine the swipe direction
function getSwipeDirection(x1, y1, x2, y2) {
    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return deltaX > 0 ? "right" : "left";
    } else {
        return deltaY > 0 ? "down" : "up";
    }
}

// Function to check if the mobile Konami code has been entered
function checkMobileKonamiCode() {
    if (touchSequence.length > mobileKonamiCode.length) {
        touchSequence.shift();
    }
    if (touchSequence.join() === mobileKonamiCode.join()) {
        activateCheats();
        touchSequence = []; // reset the sequence after activation
    }
}

function imageClick(e){
  // Grab the modal elements needed
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");

  modal.style.display = "block";
  //e is the event that caused the click so currentTarget is the image clicked 
  modalImg.src = e.currentTarget.src;
}

function imageClose(){
  var modal = document.getElementById("myModal");
  modal.style.display = "none"
}

// Function to close the Konami code cheat section
function closeKonami(){
  
  audio.pause();
  audio.currentTime=0;

  var cheatSection = document.getElementById("cheatCode");
  cheatSection.hidden = true;
  var content = document.getElementById("wrapper");
  content.hidden = false;
}

function unfade(element) {
  var op = 0.1;  // initial opacity
  element.style.display = 'block';
  var timer = setInterval(function () {
      if (op >= 1){
          clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op += op * 0.1;
  }, 100);
}

function delayedUnfade(element, delayTime) {
  setTimeout(() => {unfade(element)},delayTime)
}

function delayedTextUnfade(elementId, delayTime) {
  var element = document.getElementById(elementId);
  if (element != null)
  {
    setTimeout(() => {unfade(element)},delayTime)
  }
}

function passwordChecker(){
  var element = document.getElementById("password")
  if (element != null && element.value == "password")
  {
    location.href = "thebigday.html";
  }
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain attribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};