img = "";
status = "";
objects = [];

function preload() {
  img = loadImage("dalmatian.jpg");
}

function setup() {
  canvas = createCanvas(500, 700);
  canvas.center();
  objectDetector = ml5.objectDetector("cocossid", modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
console.log("Model is loaded!")
status = true;
objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
  if (error){
    console.log(error);
  }
  else {
    console.log(results);
    objects = results;
  }
}

function draw() {
  image(img, 0, 0, 500, 700);
  if (status != ""){
    for (i = 0; i < objects.length; i++){
      document.getElementById("status").innerHTML = "Status : Object Detected!";
      fill("pink");
      percent = floor(objects[i].confidence*100);
      text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y);
      noFill();
      stroke("magenta");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}