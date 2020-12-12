var r = Math.random()*256;
var g = Math.random()*256;
var b = Math.random()*256;
var img = "" ;
var status = "";
var objects = [];
function preload(){
    img = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(640, 480);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    textSize(17);
    
}
function modelLoaded(){
    console.log("Model Loaded !!!!");
    status = true;
    objectDetector.detect(img , gotResults);
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
function draw(){
    image(img, 0,0,640,480);
    
    if (status != ""){
        for (i = 0; i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected !";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15,objects[i].y + 15 );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width , objects[i].height);
        }
    }
}
