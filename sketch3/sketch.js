function setup() {
  var canvas = createCanvas(windowWidth, windowHeight - 10);
  canvas.parent('sketch-holder');
  background(200, 210, 220);
  frameRate(60);
}

// let noiseScale=255;
let cellSize = 100;

function draw() {
  noiseSeed(~~(mouseX/cellSize)+~~(windowWidth/cellSize)*~~(mouseY/cellSize));
  iw = windowWidth / cellSize;
  ih = windowHeight / cellSize;
  for (let x=0; x < iw; x++) {
    for (let y=0; y < ih; y++){
      let noiseVal = noise(x, y) * 10;
      let c = color(200+noiseVal, 210+noiseVal/2, 220+noiseVal);
      fill(c);
      noStroke();
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }

  xstart = windowWidth/2 - 100;
  ystart = windowHeight/2 -300;
  _sin = sin(millis()*TAU/5000);
  let it =  ((_sin*_sin)-1)*-7;
  // it = 1;
  // (50*it)
  let it2 = 1000+(50*_sin*_sin*7);
  let c = color(0,0,0);
  fill(c);
  // text(it2, 50, 30);
  text(sin((millis()*TAU)/(731*20)+1)*20, 50, 30);
  for (let i=0; i < 600; i++) {
    let c = color(230, 230, 250);
    fill(c);
    noStroke();
    let fud = sin((millis()*TAU)/(731*20)+i)*20;
    rect(xstart + (sin((millis()/it2)*TAU+i/(20*PI))*100 - fud)*it, ystart+i, 200 + fud*2*it, 1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 10);
  background(200, 210, 220);
}

function expandDetails() {
  alert("details expanded");
}
