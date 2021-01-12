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
  let shift1 = sin(t/500) * 100
  let shift2 = sin(t/500) * 50
  let shift3 = sin(t/227) * 50
  let shift4 = sin(t/211) * 30
  // let shift5 = cos(t/500) * 70
  let shift5 = 0
  let shift6 = sin(t/601) * 80
  let shift7 = cos(t/601) * 34
  noStroke();

  fill(69, 69, 69);
  beginShape();
  vertex(760.68, 497.0);
  bezierVertex(783.41, 471.07, 802.0, 428.37, 802.0, 358.0);
  bezierVertex(802.0, 177.0, 640.0, 177.0, 571.0, 177.0);
  vertex(351.0, 177.0);
  vertex(327.0, 253.0);
  vertex(639.0, 253.0);
  bezierVertex(639.0, 253.0, 784.0, 252.0, 784.0, 352.0);
  bezierVertex(784.0, 452.0, 638.0, 452.0, 638.0, 452.0);
  vertex(351.0, 452.0);
  vertex(317.0, 538.0);
  vertex(638.0, 538.0);
  bezierVertex(638.0, 538.0, 836.0, 538.0, 836.0, 687.0);
  bezierVertex(836.0, 836.0, 638.0, 836.0, 638.0, 836.0);
  vertex(351.0, 836.0);
  vertex(303.0, 934.0);
  vertex(576.0, 934.0);
  bezierVertex(663.0, 934.0, 852.0, 902.0, 852.0, 692.0);
  bezierVertex(852.0, 583.1, 805.48, 526.37, 760.68, 497.0);
  endShape();
  beginShape();
  vertex(327.0, 253.0);
  vertex(399.0, 471.0);
  vertex(317.0, 538.0);
  vertex(317.0, 538.0);
  bezierVertex(399.6, 697.01, 399.83000000000004, 892.0, 399.83000000000004, 892.0);
  vertex(413.0, 892.0);
  vertex(413.0, 204.0);
  vertex(327.0, 253.0);
  endShape();
}