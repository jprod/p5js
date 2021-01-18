function setup() {
  var canvas = createCanvas(windowWidth, windowHeight - 10);
  // var canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');
  background(200, 210, 220);
  frameRate(50);
}

// let noiseScale=255;
// let cellSize = 100;
let fc = 0
var bar = true
var started = false

function draw() {
  if (bar) {
    let startcount = 1200;
    let endcount = 2400;
    if (!(started) && fc >= startcount) {
    console.log("recording"); capturer.start(); started = true};
    if ((started) && fc >= startcount && fc < endcount) {
    console.log("recording"); capturer.capture(canvas)};
    if (fc >= endcount) {
    console.log("recording"); capturer.stop(); capturer.save(); bar = false};
  }
  let R2 = sqrt(2);
  let ww = windowWidth;
  let mw = (ww/2);
  let wh = windowHeight;
  let mh = (wh/2);
  noStroke();
  background(200, 210, 220);
  fc += 1
  let t = (fc/1200) + 0.0
  let a = t*TAU
  let c1 = color(150, 150, 150);
  if (sin(a)>0) {
    let ct = 190-65*cos(a);
    let c2 = color(ct, ct, ct);
    fill(c1);
    ellipse(ww/2, mh-cos(a)*100, 200, sin(a)*200);
    rect(mw-100, mh-cos(a)*100, 200, cos(a)*200);
    fill(c2);
    ellipse(ww/2, mh+cos(a)*100, 200, sin(a)*200);
  } else {
    let ct = 190+65*cos(a);
    let c2 = color(ct, ct, ct);
    fill(c1);
    quad(mw-100,mh+cos(a)*100, mw, mh+cos(a-PI/4)*100*R2, mw+100,mh+cos(a)*100, mw, mh+cos(a+PI/4)*100*R2);
    rect(mw-100, mh-cos(a)*100, 200, cos(a)*200);
    fill(c2);
    quad(mw-100,mh-cos(a)*100, mw, mh+cos(a+3*PI/4)*100*R2, mw+100,mh-cos(a)*100, mw, mh+cos(a+5*PI/4)*100*R2);
  } 
  fc += 1 + 12*(1-cos(a*2))
  // text(fc, 50, 50)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 10);
  background(200, 210, 220);
}

function expandDetails() {
  alert("details expanded");
}

function mousePressed() {
  frameCount = frameCount - 1
}