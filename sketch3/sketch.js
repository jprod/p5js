function setup() {
  var canvas = createCanvas(windowWidth, windowHeight - 10);
  // var canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');
  background(200, 210, 220);
  frameRate(60);
}

// let noiseScale=255;
let cellSize = 100;

function draw() {
  if (true) {
    console.log("recording")
    let startcount = 105;
    let endcount = 415;
    if (frameCount == startcount) {capturer.start()};
    if (frameCount >= startcount && frameCount < endcount) {capturer.capture(canvas)};
    if (frameCount == endcount) {capturer.stop(); capturer.save()};
  }
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
  ystart = windowHeight/2 + 300;
  _sin = sin(millis()*TAU/10000);
  let it =  ((_sin*_sin)-1)*-7;
  let it2 = 100+(700*_sin*_sin);
  let it3 = (abs(_sin)-1)*-7;
  let c = color(0,0,0);
  fill(c);
  // text(it, 50, 30);
  // text(millis(), 50, 50);
  // text(frameCount, 50, 60);
  for (let i=0; i < 600; i++) {
    let c = color(230, 230, 250);
    fill(c);
    noStroke();
    let fud = sin((millis()*TAU)/(731*20)+i)*10;
    rect(xstart+(sin((TAU*it3)+(i*TAU/it2))*70-fud)*it, ystart-i, 200, 1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 10);
  background(200, 210, 220);
}

function expandDetails() {
  alert("details expanded");
}
