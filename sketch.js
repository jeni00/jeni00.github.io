let dataServer;
let pubKey = "pub-c-f36fe4cb-8521-484d-b92b-3265cc0fffe3";
let subKey = "sub-c-fae7ce25-95cb-4d22-8dca-9e4f509e15cd";
let secretKey = "sec-c-ZjAzYzA2MWUtM2E1Mi00MzljLTliMzktNDUwZWYzNmE4MDcz";

let channelName = "NFCs"; // we don't define this right away!

let you;


let message; // message we use to send to pubnub

let noParams = false;

var sendText;
var sendButton;

var url = new URL(window.location.href);
let NFC1 = url.searchParams.get("NFC1");
let NFC2 = url.searchParams.get("NFC2");

console.log("NFC TAG 1 = " + NFC1);
console.log("NFC TAG 2 = " + NFC2);

if (NFC1 != null) {
  createCanvas(windowWidth, windowHeight);
  fill(201, 175, 196);

  textAlign(CENTER);
  textSize(20);
  fill(131, 123, 126);
  text("How was your day?", windowWidth/2, 50);
  text("Leave your message to UserB.", windowWidth/2, 60);

  sendText = createInput();
  sendText.position((windowWidth/2) - 100, windowHeight *0.8);

  sendButton = createButton("Send a message");
  sendButton.position(sendText.x + sendText.width, windowHeight * 0.8);
  sendButton.mousePressed(sendTheMessage);


} else if (NFC2 != null) {
  createCanvas(windowWidth, windowHeight);
  fill(197, 220, 210);

  textAlign(CENTER);
  textSize(20);
  fill(131, 123, 126);
  text("How was your day?", windowWidth/2, 50);
  text("Leave your message to UserB.", windowWidth/2, 60);

  sendText = createInput();
  sendText.position((windowWidth/2) - 100, windowHeight *0.8);

  sendButton = createButton("Send a message");
  sendButton.position(sendText.x + sendText.width, windowHeight * 0.8);
  sendButton.mousePressed(sendTheMessage);

} else {
  noParams = true;
}

console.log("message = " + message);


function preload() { 

  // logic to create a random UUID
    you = random(0,1000000); 
    console.log(you);
    you = int(you);
    console.log(you);
    you = you.toString();
  
}


function setup() {

    createCanvas(windowWidth, windowHeight);
    fill(255,247,253)

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: you,
      secretKey: secretKey,
      heartbeatInterval: 0,
    });

     // listen for messages coming through the subcription feed on this specific channel. 

    dataServer.subscribe({ channels: [channelName] });
    dataServer.addListener({ message: readIncoming });
   
    textAlign(CENTER);
    textSize(40);
    if (noParams == false) {
      sendTheMessage();
    } else {
      fetchMessages();
      noStroke();
      fill(201, 175, 196);
      text("UserA", windowWidth*0.25, windowHeight/2);
      fill(197, 220, 210);
      text("UserB", windowWidth*0.75, windowHeight/2);

    }
    
}
  
function draw() {

  
}
/*
function mousePressed() {

fetchMessages();


}
*/
function fetchMessages() {

console.log("fetching");

  dataServer.fetchMessages(
    {
        channels: [channelName],
        end: '15343325004275466',
        count: 100
    },
    (status, response) => {
      console.log(status);
      console.log(response.channels.NFCs);
      drawMessages(response.channels.NFCs);
    }
  );
   
}

function drawMessages(messageHistory) {

  console.log("in draw messages");

  console.log(messageHistory);
  
  for (let i = 0; i < messageHistory.length; i++) {
      console.log(messageHistory[i]);
      messageTime = convertTime(messageHistory[i].timetoken);


    if (messageHistory[i].message === "UserA") {

     
      noStroke(0);
      ellipse((windowWidth/2) - 20, (windowHeight - 20)*(i+1), 50);
      fill(218, 184, 224);

      console.log(messageHistory[i]);
      textSize(20);
      textAlign(CENTER);
      textColor(131, 123, 126);
      text(messageHistory[i].message.messageText, (windowWidth/2) - 20, ((windowHeight - 20)*(i-1))+5);
      text(messageTime, (windowWidth/2) - 20, ((windowHeight - 20)*(i-1))+15);

    } else if ((messageHistory[i].message === "UserB")) {
      
      noStroke(0);
      ellipse(20 + windowWidth/2,  (windowHeight - 20)*(i+1), 50);
      fill(206, 242, 216);


      console.log(messageHistory[i]);
      textSize(20);
      textAlign(CENTER);
      textColor(131, 123, 126);
      text(messageHistory[i].message.messageText, (windowWidth/2) + 20, ((windowHeight - 20)*(i-1))+5);
      text(messageTime, (windowWidth/2) + 20, ((windowHeight - 20)*(i-1))+15);

    } 
  

  }

}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  
  dataServer.publish({
    channel: channelName,
    message: {
      messageText: sendText.value()
    },
  });
  sendText.value("");
}

function readIncoming(inMessage) {
  console.log(inMessage);
  fetchMessages();
}

function convertTime(original_timetoken) {
  
  console.log(original_timetoken);

  epoch_time = (original_timetoken / 10000);

  let date = new Date(epoch_time);
  
  return date;
}
