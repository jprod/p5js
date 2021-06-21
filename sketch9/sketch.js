let fc = 0;
const SIDELEN = 20.0;
var SQRT3;
var bar = false;
var started = false;
var cam = [0,0,0];
var center = [0, 0];
var triwidth_px = "50"; //50
var triheight_px = "90"; //90
var triwidth =  parseInt(triwidth_px);
var triheight =  parseInt(triheight_px);
var pencolor = '#000000';
var penalpha = 255;
var penalphaMax = 255;
var bgcolor = '#FFFFFF';
var bgalpha = 0;
var bgalphaMax = 255;
var bgactual;
var gridlines = true;
var gridlineweight = 0.5;
var gridlineweightMax = 1.5;
var gridlineweightStep = 0.01;
var buffvec = [0.5, 0.866];
var buffcoeff = 0.05;
var trimatrix;
var buttonbot;
var dither = false;
var webcolors = false;
var skipbuffer = [-1,-1];
var parVec = [[1,-1], [-1,1], [1,1], [-1,-1]];
var actualNext = [[[0.5, 0.866], [-1, 0], [0.5, -0.866]],
                  [[1, 0], [-0.5, -0.866], [-0.5, 0.866]],
                  [[0.5, -0.866], [-1, 0], [0.5, 0.866]],
                  [[1, 0], [-0.5, 0.866], [-0.5, -0.866]]]
var gui;
var webcol;

// let nextList = [[1,0], [-1,0], parVec[par]];


function setup() {
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  frameRate(60);
  gui = createGui('GUI');
  sliderRange(0, 1000, 1);
  gui.addGlobals("triwidth_px", "triheight_px", "pencolor", "penalpha", 
    "bgcolor", "bgalpha", "gridlines", "gridlineweight");

  var canvas = createCanvas(windowWidth, windowHeight - 10);
  
  center[0] = windowWidth/2;
  center[1] = windowHeight/2;
  buttonbot = windowHeight/2 + 40;

  bgactual = color(bgcolor);
  bgactual.setAlpha(bgalpha);

  trimatrix = Array(triheight).fill().map(()=>Array(triwidth).fill(bgactual));

  canvas.parent('sketch-holder');
  background(100, 100, 105);
  SQRT3 = sqrt(3)

  button = createButton('change res');
  button.position(20, buttonbot - 60);
  button.mousePressed(changeRes);

  button = createButton('change bg');
  button.position(20, buttonbot - 30);
  button.mousePressed(changeBG);

  button = createButton('save .png');
  button.position(20, buttonbot);
  button.mousePressed(savePNG);
}

function draw() {
  background(87, 89, 87);
  drawCheckerboard();
  if (mouseIsPressed) {
    if (mouseButton === CENTER) {
      cursor('grab');
    } else {
      cursor(CROSS);
    }
  } else {
    cursor(CROSS);
  }
  drawTriGrid();
}

function drawCheckerboard() {
  let numofchecks = 70;
  let checkwidth = windowWidth/numofchecks;
  let numrows = windowHeight/checkwidth;
  for (let i = 0; i < numrows; i++) {
    for (let j = ((i%2 == 0) ? 0 : 1); j < numofchecks; j+=2) {
      fill(color(120,120,120));
      noStroke();
      square(j*checkwidth, i*checkwidth, checkwidth);
    }
  }
}

function drawDiagGrid(s, h, y0) {
  let kl = ceil((triheight-2)/4);
  let kr = ceil(triheight/4);
  let numld = triwidth + ((triheight == 1) ? 0 : kl);
  let numrd = triwidth + ((triheight == 1) ? 0 : kr); 
  let x0 = cam[0]+center[0] - s*triwidth/2
  let rightbound = x0+triwidth*s+s/2;
  strokeWeight(gridlineweight);
  stroke('#fae');
  // Base Lines
  let y = y0;
  for (let i = 0; i < triheight; i++) {
    let x = cam[0]+center[0] - s*triwidth/2 + parrow(i%4)*s/2;
    if (gridlines) {
      line(x, y, x+s*triwidth, y);
    }
    y += h*((i+1)%2);
  }
  // Right Diagonals (going down to the right)
  for (let i = 0; i < numrd; i++) {
    let topstart = x0 + i*s - ceil(kr-1)*s
    let x1 = topstart;
    let y1 = y0;
    let x2 = topstart+s*(ceil(triheight/2)/2);
    let y2 = y0 + h*ceil(triheight/2);
    if (topstart < x0) { // topstart < x0
      x1 = x0;
      y1 = y0 + h*ceil(triheight/2) - (2*i+floor((triheight-1)%4/2)+1)*h;
    } 
    if (topstart+s*(ceil(triheight/2)/2) > rightbound) {
      y2 = y0 + (2*(numrd-i)-1)*h;
      x2 = x0 + triwidth*s+s/2;
    } else if (triheight%4 == 1 && x2 > rightbound-s) {
      x2 = rightbound-s/2;
      y2 = y0 + h*ceil(triheight/2)-h;
    }
    line(x1, y1, x2, y2);
  }
  // Left Diagonals (going down to the left)
  for (let i = 0; i < numld; i++) {
    let topstart = x0 + i*s + s
    let x1 = topstart;
    let y1 = y0;
    let x2 = topstart-s*(ceil(triheight/2)/2);
    let y2 = y0 + h*ceil(triheight/2);
    if (topstart > rightbound) { //topstart > rightbound
      x1 = rightbound;
      y1 = y0 + h*ceil(triheight/2) - (2*(numld-i-1)+floor((triheight+1)%4/2)+1)*h;
    } 
    if (topstart-s*(ceil(triheight/2)/2) < x0) {
      x2 = x0;
      y2 = y0 + 2*(i+1)*h;
    } else if (triheight%4 == 3 && x2 < x0+s) {
      x2 = x0+s/2;
      y2 = y0 + h*ceil(triheight/2)-h;
    }
    line(x1, y1, x2, y2);
  }
}

function drawTriGrid() {
  s = SIDELEN * ((cam[2]/720)+1)
  h = SQRT3*s/2
  y =  cam[1]+center[1] - h*triheight/4
  for (let i = 0; i < triheight; i++) {
    x = cam[0]+center[0] - s*triwidth/2 + parrow(i%4)*s/2;
    tripar = (i+1)%2 * 2 - 1;
    for (let j = 0; j < triwidth; j++) {
      drawTriangles(x, y, s, trimatrix[i][j], tripar);
      x += s;
    }
    y += h*((i+1)%2);
  }
  if (gridlines)
    drawDiagGrid(s,h,cam[1]+center[1] - h*triheight/4);
}

function parrow(num) {
  if (num == 1 || num == 2) 
    return 1;
  return 0;
}

function drawTriangles(x, y, s, c, par) {
  let coeff2 = 5;
  fill(c);
  noStroke();
  triangle(x - buffvec[0]*buffcoeff*coeff2, y - buffvec[1]*buffcoeff*par*coeff2, 
    x + s + buffvec[0]*buffcoeff*coeff2, y - buffvec[1]*buffcoeff*par*coeff2, x + s/2, y + par*SQRT3*s/2 + par*buffcoeff*coeff2);
}

function mouseWheel(event) {
  cam[2] -= event.delta;
}

function mouseReleased(event) {
  if (mouseButton === LEFT) {
    skipbuffer = [-1,-1];
  }
  if (mouseButton === RIGHT) {
    skipbuffer = [-1,-1];
  }
}

function mousePressed(event) {
  let c = color(pencolor);
  c.setAlpha(penalpha);
  if (mouseButton === LEFT) {
    seekGrid(event.clientX, event.clientY, c);
  }
  if (mouseButton === RIGHT) {
    seekGrid(event.clientX, event.clientY, bgactual);
  }
  if (mouseButton === CENTER) {
    cursor('grab');
  }
}

function mouseDragged(event) {
  let c = color(pencolor);
  c.setAlpha(penalpha);
  if (mouseButton === LEFT) {
    seekGrid(event.clientX, event.clientY, c);
  }
  if (mouseButton === RIGHT) {
    seekGrid(event.clientX, event.clientY, bgactual);
  }
  if (mouseButton === CENTER) {
    cursor('grab');
    cam[0] += event.movementX;
    cam[1] += event.movementY;
  }
  // prevent default
}

function closeNextVec(vec, par) {
  let nextList = [[1,0], [-1,0], parVec[par]];
  let realNext = actualNext[par];
  let len = vecLen([realNext[0][0]-vec[0], realNext[0][1]-vec[1]]);
  let best = nextList[0];
  for (let i = 1; i < 3; i++) {
    let ilen = vecLen([realNext[i][0]-vec[0], realNext[i][1]-vec[1]]);
    if (ilen < len) {
      len = ilen;
      best = nextList[i];
    }
  }
  return best;
}

function setLine(y1, x1, y2, x2, c) {
  let fudge = 0.3;
  let vec = [y2-y1,x2-x1];
  let normvec = normalize(vec);
  let length = sqrt(vec[0]*vec[0]+vec[1]*vec[1]);
  let hdir = vec.map(d => d / length);
  let cursor = [y1, x1];
  let i = 0
  while (round(cursor[0]) != y2 || round(cursor[1]) != x2) {
    let next = closeNextVec([y2-cursor[0], x2-cursor[1]], round(cursor[0])%4);
    let nexttri = [round(cursor[0]) + next[0], round(cursor[1]) + next[1]];
    trimatrix[nexttri[0]][nexttri[1]] = c;
    let vp = vecPerp([y1 - nexttri[0], x1 - nexttri[1]], normvec);
    let ncnorm = !(vp[0] == 0 && vp[1] ==0) ? normalize(vp) : [0,0];
    cursor = [nexttri[0] + ncnorm[0] * fudge, nexttri[1] + ncnorm[1] * fudge];
    i++;
    if (i > 50)
      break;
  }
  trimatrix[y2][x2] = c;
}

function seekTri(mx, my, x, y, s, par, i, j, c) {
  vec0 = normalize([mx-x, my-y]);
  vec1 = normalize([mx-(x+s), my-y]);
  if (vec0[0] > 0.55 && vec1[0] < -0.55 && ((par == 1 && vec0[1] > 0.0) || (par == -1 && vec0[1] < 0.0))) {
    if (skipbuffer[0] != -1 && (skipbuffer[0] != i || skipbuffer[1] != j) && !triAdjacent(skipbuffer, [i,j])) {
      setLine(skipbuffer[0], skipbuffer[1], i, j, c);
    } else if (skipbuffer[0] != i || skipbuffer[1] != j) {
      trimatrix[i][j] = c;
    }
    skipbuffer = [i,j];
  }
}

function seekGrid(mx, my, c) {
  s = SIDELEN * ((cam[2]/720)+1)
  h = SQRT3*s/2
  y =  cam[1]+center[1] - h*triheight/4
  for (let i = 0; i < triheight; i++) {
    x = cam[0]+center[0] - s*triwidth/2 + parrow(i%4)*s/2;
    tripar = (i+1)%2 * 2 - 1;
    for (let j = 0; j < triwidth; j++) {
      seekTri(mx, my, x, y, s, tripar, i, j, c);
      x += s;
    }
    y += h*((i+1)%2);
  }
}

function triAdjacent(t1, t2) {
  let nextList = [[1,0], [-1,0], parVec[t1[0]%4]];
  for (let i = 0; i < 3; i++) {
    if (nextList[i][0]+t1[0] == t2[0] && nextList[i][1]+t1[1] == t2[1]) {
      return true;
    }
  }
  return false;
}

function vecPerp(vec, unitvec) {
  return vecAdd(vec, vecScal(unitvec, -1*vecDot(vec, unitvec)));
}

function vecAdd(vec1, vec2) {
  return [vec1[0]+vec2[0], vec1[1]+vec2[1]];
}

function vecScal(vec, scaler) {
  return [vec[0]*scaler, vec[1]*scaler];
}

function vecDot(vec1, vec2) {
  return (vec1[0]*vec2[0] + vec1[1]*vec2[1])
}

function vecLen(vec) {
  return sqrt(vec[0]*vec[0]+vec[1]*vec[1]);
}

function normalize(vec) {
  let length = vecLen(vec);
  return vec.map(d => d / length)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 10);
}

function savePNG() {
  let img = createImage(triwidth, triheight);
  img.loadPixels();
  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {
      img.set(j, i, trimatrix[i][j]);
    }
  }
  img.updatePixels();
  save(img, 'myImage.png');
}

function changeRes() {
  let nextwidth = parseInt(triwidth_px);
  let nextheight = parseInt(triheight_px);
  trimatrix.splice(nextheight, triheight - nextheight);
  triheight = (triheight > nextheight) ? nextheight : triheight;
  for (let i = 0; i < triheight; i++) {
    trimatrix[i].splice(nextwidth, triwidth + 1 - nextwidth);
    if (nextwidth > triwidth)
      Array.prototype.push.apply(trimatrix[i], Array(nextwidth - triwidth).fill(bgactual));
  }
  if (nextheight >triheight)
    Array.prototype.push.apply(trimatrix, (Array(nextheight - triheight).fill().map(()=>Array(nextwidth).fill(bgactual))));
  triheight = nextheight;
  triwidth = nextwidth;
}

function changeBG() {
  colbuff = color(bgcolor);
  colbuff.setAlpha(bgalpha);
  for (let i = 0; i < triheight; i++) {
    for (let j = 0; j < triwidth; j++) {
      if (trimatrix[i][j] == bgactual) 
        trimatrix[i][j] = colbuff;
    }
  }
  bgactual = colbuff;
}
