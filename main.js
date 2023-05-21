var randomNumber =0;

var sketch ="";

var timerCounter = 0;

var timerCheck="";

var drawSketch = "";

var answerHolder = "";

var score = 0;


array1=['pen','paper','book','bottle',"aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus",
"axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear",
"beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthdaycake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain"];

randomNumber = Math.floor((Math.random()*array1.length));

console.log(array1[randomNumber]);

console.log(randomNumber);

sketch = array1[randomNumber];

console.log(sketch);

document.getElementById("desenhado").innerHTML="ESBOÇO A SER DESENHADO:"+ sketch;

function updateCanvas(){
    background("white");
    randomNumber = Math.floor((Math.random()*array1.length));
    sketch = array1[randomNumber];
    console.log(sketch);
}

function setup(){
    canvas = createCanvas(280,280);
    background ("white");
    canvas.center();
    canvas.mouseReleased(classifyCanvas);

}

function draw(){
    strokeWeight(15);
    stroke(0);

    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
     checkSketch();
    if(drawSketch == sketch){
        answerHolder="set";
        score=score+1;
    
       document.getElementById("pontuação").innerHTML="Pontuação : "+score;
     }
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
     console.log(results);
     drawSketch=results[0].label;
     document.getElementById("esboço").innerHTML="Seu esboço : "+drawSketch;
     document.getElementById("precisão").innerHTML="Precisão : "+results[0].confidence;
    }

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function checkSketch(){
    timerCounter=timerCounter+1;
    document.getElementById("tempo").innerHTML ="Tempo : "+timerCounter;
    console.log(timerCounter);
    if(timerCounter>400){
        timerCounter =0;
        timerCheck="completed";
    }
    if(timerCounter=="completed"||answerHolder=="set"){
        timerCheck="";
        answerHolder="";
        updateCanvas();
    }
}

function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}
  