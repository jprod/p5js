// let noiseScale=255;
// let cellSize = 100;
let fc = 0
var gui;
var webcol;



function setup() {
  var canvas = createCanvas(windowWidth, windowHeight - 10);
  // var canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');
  frameRate(50);
  // gui = createGui('Colors');
  // gui.addGlobals("p0","p1","p2","p3", "dither", "webcolors");
  noLoop();
}

function drawsquig(xorig, yorig, end, dim=true) {
  noFill();
  beginShape();
  let x = xorig;
  let y = yorig;
  let ydif = random(30, 70);
  let adif = ydif * random(0.3, 0.5);
  let xdif = random(-5, 5);
  let x2;
  let y2;
  let adif2;
  let d
  if (dim) vertex(x, y);
  else vertex(y, x);
  while (y < end) {
    y2 = y + ydif;
    adif2 = ydif * random(0.2, 0.5);
    x2 = x + xdif - (x - xorig) * random(.9);
    if (dim) bezierVertex(x, y+adif, x2, y2-adif2, x2, y2);
    else bezierVertex(y+adif, x, y2-adif2, x2, y2, x2);
    x = x2;
    y = y2;
    ydif = random(30, 70);
    adif = adif2;
    xdif = random(-5, 5);
  }
  endShape();
}

function layer(cells, xoffset, yoffset) {
  for (let src = xoffset; src < windowWidth; src += windowWidth / cells) {
    drawsquig(src + random(-10,10),  random(20), windowHeight);
  }  
  for (let src = yoffset; src < windowHeight; src += windowHeight / cells) {
    drawsquig(src + random(-10,10),  random(20), windowWidth, false);
  }
}

function draw() {
  background(255, 255, 255);
  let cells = 30;
  for (let src = 8; src > 0; src--) {
    stroke(200 + src*5, 218 + src*4, 200 + src*5);
    strokeWeight(src/2);
    layer(cells + src, random(50), random(50));
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 10);
}