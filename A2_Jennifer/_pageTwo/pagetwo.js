
var cursors = [];

// variable used for incoming messages
var x;
var y;

var incomingX;
var incomingY;
var answer;

var incomingAnswer;
var button;
let channelName = "welcomePage";

let r;
let g;
let b;

let you;
let who;
// printing out the values so that we know what is going on. 

 // creating our pubnub server with our name.
function preload() {

  
  var url = new URL(window.location.href);
  answer = url.searchParams.get ("answer");

  console.log('PRELOAD: ' +answer);

  you = random (0,1000000);
  console.log (you);
  you = int (you);
  console.log (you);
  you = you.toString ();

}

function setup() {

    createCanvas(windowWidth, windowHeight);

    background(255);

    button = createButton('Write more comments');
	  button.position(windowWidth/2, 250);
	  button.mousePressed(gotolink);

    
    //console.log ('SETUP: ' + answer);

    

    r = random (0,255);
    g = random (0,255);
    b = random (0,255);
  
    // listen for messages coming through the subcription feed on this specific channel. 
    
    createServer(you);

    dataServer.subscribe({ channels: [channelName] });
    dataServer.addListener({ message: readIncoming});

    //console.log ('SERVER: ' + dataServer);

    // create a new JSON object to store the mouse position, and name of the user from the previous page
    new allCursors(mouseX, mouseY, answer, you);
  
  }
  
function draw() {

  sendTheMessage(); 
  background(255);

  frameRate(5);

  textSize(30);
  textAlign(CENTER);
  fill(0,0,0);
  text("Move your cursors to the comment you find most agree with.", windowWidth/2, 200);



  for (let i = 0; i < cursors.length; i++) { // loop through all the cursors and show them on the page
   console.log("in here" + cursors[i]);
    //noStroke(0);
    //ellipse(cursors[i].x, cursor[i].y, 50, 50);
    textSize(60);
    //textAlign(CENTER);
    fill(r,g,b);
    text(cursors[i].answer, cursors[i].x, cursors[i].y);
    
  }

}

function gotolink() {
	window.open('http://127.0.0.1:5500/');
}

  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases

  dataServer.publish({
    channel: channelName,
    message: {
      x: mouseX,
      y: mouseY,
      r: r,
      g: g,
      b: b,
      answer: answer,
      you: you,
    },
  });
}

function readIncoming(inMessage) {

  console.log ('READ');
  // when new data comes in it triggers this function,
  // we call this function in the setup

  /*since an App can have many channels, we ensure that we are listening
  to the correct channel */

  //console.log(inMessage);

  //if (true) {

    incomingX = inMessage.message.x; // get the mouseX value from the other people
    incomingY = inMessage.message.y;
    incomingR = inMessage.message.r;
    incomingG = inMessage.message.g;
    incomingB = inMessage.message.b; // get the mouseY value from the other people
    incomingAnswer = inMessage.message.answer; // the message
    who = inMessage.message.you;
    console.log(inMessage); //logging for information

   let newinput = true; // we are checking to see if this person who sent the message is already on the page. 

      for(let i = 0; i < cursors.length; i++) { // loop through all the IDs that have sent us messages before
        if(who==cursors[i].who) { // if who is already in our array, update the x & y values
          console.log(who);
          cursors[i].x = incomingX;
          cursors[i].y = incomingY;
          cursors[i].r = incomingR;
          cursors[i].g = incomingG;
          cursors[i].b = incomingB;
          newinput = false;    // set the boolean to false since this is not a new user
        }
      }

      if(newinput) { // if this is a new user, create a new JSON object that we add to our array
        cursors.push(new allCursors(x,y, incomingAnswer, who));
      }
  //}
}
function allCursors(x,y,a, who){ // creates a new JSON object for us
 
  this.x = x; // this is shorthand for saying "this object"
  this.y = y;
  this.r = r;
  this.g = g;
  this.b = b;
  this.who = who;
  this.answer = a;

  console.log('ALL' + this.x + this.y + this.r + this.g + this.b +this.answer);
}