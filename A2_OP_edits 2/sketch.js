
let channelName = "welcomePage";

let answerInput 

let you

let answer


function setup() {

    createCanvas(windowWidth, windowHeight);

    background(255);


    answerInput = createInput();
    answerInput.style('font-size', '20px');
    answerInput.position(windowWidth/2.5, 500);
    

    submitButton = createButton("Comment");
    submitButton.position(windowWidth/2.5+50, 550);
    submitButton.style('font-size', '20px');
    



    var textArray = new Array ();
    textArray[0] = "Durian";
    textArray[1] = "Tomato";
    textArray[2] = "Violence";
    textArray[3] = "Horror Movies";
    textArray[4] = "BTS";
    textArray[5] = "Avocado";

  var i = Math.floor(6*Math.random())
    

    
    textSize(40);
    textAlign(CENTER);
    text(textArray[i], windowWidth/2, 400);

    
  
  }
  
function draw() {
  

  textSize(30);

  textAlign(CENTER);

  text("Welcome!", windowWidth/2, 200);

  textSize(25);

  textAlign(CENTER);

  text("This is an anonymous channel.", windowWidth/2, 230);


  text("How do you think about the following subject? ", windowWidth/2, 280)
  text("Do you like it? What is your impression of it?", windowWidth/2, 310);

  text("Feel free to write down your comments.", windowWidth/2, 340);


  submitButton.mousePressed(sendTheMessage);

}
 
function sendTheMessage() {
  if (answerInput.value() != "") {
    answer = answerInput.value();
    window.location.href = "/../_pageTwo/index.html?answer="+answer; 
  } else {
    window.alert ("Please tell me your opinion on the subject. Let's see if we hold the same point of view.");

  }
}
