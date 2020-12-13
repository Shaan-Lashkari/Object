
var img = "" ;
var status = "";
var objects = [];
function preload(){
    
}
function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    textSize(17);
    
}
function modelLoaded(){
    console.log("Model Loaded !!!!");
    status = true;
    objectDetector.detect(video , gotResults);
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
        console.log("This is oritare");
    }
    else {
        console.log(results);
        objects = results;
    }
}
function draw(){
    image(video, 0,0,500,400);
    
    if (status != ""){
        var r = random(255);
        var g = random(255);
        var b = random(255);
        for (i = 0; i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected !";
            document.getElementById("no_objects").innerHTML = "Number of objects detected are : " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15,objects[i].y + 15 );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width , objects[i].height);
        }
    }
}
