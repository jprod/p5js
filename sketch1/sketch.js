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
  vertex(skewT(646.5 + shift3, 835.0), skewH(835.0, 835.0));
  bezierVertex(skewT(646.5 + shift3, 835.0), skewH(835.0), skewT(625.0 + shift3, 291.0 + shift1), 
    skewH(291.0 + shift1, 291.0 + shift1), skewT(888.5, 291.0 + shift1), skewH(291.0 + shift1, 291.0 + shift1));
  bezierVertex(skewT(1152.0 - shift3, 291.0  + shift1), skewH(291.0  + shift1, 291.0  + shift1), 
    skewT(1151.5 - shift3, 835.0), skewH(835.0, 835.0), skewT(1151.5 - shift3, 835.0), skewH(835.0, 835.0));
  vertex(skewT(987.0 - shift4, 835.0), skewH(835.0, 835.0));
  vertex(skewT(977.0 - shift4, 699.0 + shift2), skewH(699.0 + shift2, 699.0 + shift2));
  vertex(skewT(815.0 + shift4, 699.0 + shift2), skewH(699.0 + shift2, 699.0 + shift2));
  vertex(skewT(811.0 + shift4, 835.0), skewH(835.0, 835.0));
  endShape();
  erase();
  beginShape();
  vertex(skewT(970.5 - shift4, 622.0 + shift2), skewH(622.0 + shift2, 622.0 + shift2));
  bezierVertex(skewT(970.5 - shift4, 622.0 + shift2), skewH(622.0  + shift2, 622.0 + shift2), skewT(965.0 - shift4, 455.0 + shift1 + shift4), 
    skewH(455.0 + shift1 + shift4, 455.0 + shift1 + shift4), skewT(888.5, 455.0 + shift1 + shift4), skewH(455.0 + shift1 + shift4, 455.0 + shift1 + shift4));
  bezierVertex(skewT(810.0 + shift4, 455.0 + shift1 + shift4), skewH(455.0 + shift1 + shift4, 455.0 + shift1 + shift4), 
    skewT(820.5 + shift4, 622.0 + shift2), skewH(622.0 + shift2, 622.0 + shift2), skewT(820.5 + shift4, 622.0 + shift2), skewH(622.0  + shift2, 622.0 + shift2));
  endShape();
  noErase();


  fill(237 + shift6, 34 + shift7, 93 + shift1);
  beginShape();
  vertex(646.5 + shift3, 835.0 + shift5);
  bezierVertex(646.5 + shift3, 835.0, 625.0 + shift3, 291.0 + shift1, 888.5, 291.0 + shift1);
  bezierVertex(1152.0 - shift3, 291.0  + shift1, 1151.5 - shift3, 835.0, 1151.5 - shift3, 835.0 + shift5);
  vertex(987.0 - shift4, 835.0 + shift5);
  vertex(977.0 - shift4, 699.0 + shift2);
  vertex(815.0 + shift4, 699.0 + shift2);
  vertex(811.0 + shift4, 835.0 + shift5);
  endShape();
  erase();
  beginShape();
  vertex(970.5 - shift4, 622.0 + shift2);
  bezierVertex(970.5 - shift4, 622.0  + shift2, 965.0 - shift4, 455.0 + shift1 + shift4, 888.5, 455.0 + shift1 + shift4);
  bezierVertex(810.0 + shift4, 455.0 + shift1 + shift4, 820.5 + shift4, 622.0 + shift2, 820.5 + shift4, 622.0  + shift2);
  endShape();
  noErase();
}