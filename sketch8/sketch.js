// let noiseScale=255;
// let cellSize = 100;
let fc = 1
let diff = 0.00001
var gui;
var webcol;



function setup() {
  var canvas = createCanvas(windowWidth, windowHeight - 10);
  // var canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');
  frameRate(50);
  // gui = createGui('Colors');
  // gui.addGlobals("p0","p1","p2","p3", "dither", "webcolors");
}

function draw() {
  diff = 1 + sqrt(fc)
  fc = fc + diff
  background(240, 240, 240);
  textSize(32);
  text(floor(fc), windowWidth/2, windowHeight/2);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 10);
}
