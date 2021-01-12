function setup() {
  createCanvas(windowWidth, windowHeight);
  setAttributes('antialias', true);
}

function skewT(num, h) {
  let diff = 835.0 - h
  return num + diff * 0.6
}

function skewH(num, h) {
  let diff = (835.0 - h) / 10000
  return num + 0
}


function draw() {
  clear();
  let t = millis()
  // text(t, 100, 100);
  let s1 = cos(t/919) * -1000 + 1000
  let s2 = cos(t/919) * -900 + 900
  let s3 = cos(t/1000) * -1
  let s4 = sin(t/421) * 2 + 1
  let s5 = sin(t/449) * 2 + 1
  let s6 = sin(t/601) * 80
  let s7 = cos(t/601) * 34

  let n = noise(s1, s2) / 5 

  noStroke();
  shearX(s4)
  shearY(s5)
  translate(500, 500)
  translate(p5.Vector.fromAngle(millis() / 1000, 40))
  fill(100-(s3*100), 90-(s3*30), 125-(s3*20));
  beginShape();
  vertex(760.68+s1, 497.0);
  bezierVertex(783.41+s1, 471.07, 802.0+s1, 428.37, 802.0+s1, 358.0);
  bezierVertex(802.0+s1, 177.0, 640.0+s1, 177.0, 571.0+s1, 177.0);
  vertex(351.0-s1, 177.0);
  vertex(327.0-s1, 253.0);
  vertex(639.0+s2, 253.0);
  bezierVertex(639.0+s2, 253.0, 784.0+s2, 252.0, 784.0+s2, 352.0);
  bezierVertex(784.0+s2, 452.0, 638.0+s2, 452.0, 638.0+s2, 452.0);
  vertex(351.0-s1, 452.0);
  vertex(317.0-s1, 538.0);
  vertex(638.0+s2, 538.0);
  bezierVertex(638.0+s2, 538.0, 836.0+s2, 538.0, 836.0+s2, 687.0);
  bezierVertex(836.0+s2, 836.0, 638.0+s2, 836.0, 638.0+s2, 836.0);
  vertex(351.0-s1, 836.0);
  vertex(303.0-s1, 934.0+s1);
  vertex(576.0+s1, 934.0+s1);
  bezierVertex(663.0+s1, 934.0+s1, 852.0+s1, 902.0, 852.0+s1, 692.0);
  bezierVertex(852.0+s1, 583.1, 805.48+s1, 526.37, 760.68+s1, 497.0);
  endShape();
  beginShape();
  vertex(327.0-s1, 253.0);
  bezierVertex(366.37, 253.0, 398.0, 283.0, 398.49, 324.21);
  vertex(399.0, 471.0);
  vertex(317.0-s1, 538.0);
  vertex(317.0-s1, 538.0);
  bezierVertex(362.49, 538.0, 399.0, 574.0, 399.47, 620.3199999999999);
  bezierVertex(399.6, 697.01, 399.83000000000004, 892.0, 399.83000000000004, 892.0);
  vertex(413.0, 892.0);
  vertex(413.0, 204.0);
  vertex(327.0-s1, 253.0);
  endShape();
}