// let noiseScale=255;
// let cellSize = 100;
let fc = 0
var bar = false
var started = false
var p0 = '#eb4034';
var p1 = '#8634eb';
var p2 = '#59785e';
var p3 = '#55801d';
var p0before = '';
var p1before = '';
var p2before = '';
var p3before = '';
var dither = false;
var gui;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight - 10);
  // var canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');
  background(200, 210, 220);
  frameRate(50);
  gui = createGui('Colors');
  gui.addGlobals("p0","p1","p2","p3", "dither");
  noLoop();
}

function draw() {
  if (bar) {
    let startcount = 1;
    let endcount = 200;
    if (!(started) && fc >= startcount) {
    console.log("recording"); capturer.start(); started = true};
    if ((started) && fc >= startcount && fc < endcount) {
    console.log("recording"); capturer.capture(canvas)};
    if (fc >= endcount) {
    console.log("recording"); capturer.stop(); capturer.save(); bar = false};
  }
  let ww = windowWidth;
  let wh = windowHeight;
  let up0 = [unhex(p0[1]+p0[2]), unhex(p0[3]+p0[4]), unhex(p0[5]+p0[6])]
  let up1 = [unhex(p1[1]+p1[2]), unhex(p1[3]+p1[4]), unhex(p1[5]+p1[6])]
  let up2 = [unhex(p2[1]+p2[2]), unhex(p2[3]+p2[4]), unhex(p2[5]+p2[6])]
  let up3 = [unhex(p3[1]+p3[2]), unhex(p3[3]+p3[4]), unhex(p3[5]+p3[6])]

  if (dither && ((p0before != p0)||(p1before != p1)||(p2before != p2)||(p3before != p3))) {
    dither = false;
    document.getElementById("qs_5").checked = false;
  }

  if (!dither) {
    for (let i = 0; i < ww; i += 1) {
      let t = i / ww;
      stroke(Bez(t, up0, up1, up2, up3));
      line(i, 0, i, wh);
    }
  }

  if (dither) {
    loadPixels();
    let d = pixelDensity();

    function getp(x, y) {
      index = 4 * ((y * d) * ww * d + (x * d));
      return [pixels[index], pixels[index+1], pixels[index+2], pixels[index+3]];
    }

    function setp(x, y, c_set) {
      index = 4 * ((y * d) * ww * d + (x * d));
      pixels[index] = c_set[0];
      pixels[index+1] = c_set[1];
      pixels[index+2] = c_set[2];
      pixels[index+3] = 255;
    }

    let buff = [...Array(wh)].map(x=>Array(ww));
    for (let y = 0; y < wh; y++) {
      for (let x = 0; x < ww; x++) {
        let t = x / ww;
        buff[y][x] = Bez(t, up0, up1, up2, up3)
      }
    }

    for (let y = 0; y < wh; y++) {
      for (let x = 0; x < ww; x++) {
        let op = buff[y][x];
        let np = [round(op[0]),round(op[1]),round(op[2])];
        buff[y][x] = np;
        let qerr = [op[0]-np[0],op[1]-np[1],op[2]-np[2]];
        if (x+1 < ww) {
          buff[y][x+1] = madd(buff[y][x+1], mscale(qerr, 7/16));
        }
        if (y+1 < wh) {
          if (x-1 >= 0) {
            buff[y+1][x-1] = madd(buff[y+1][x-1], mscale(qerr, 3/16));
          }
          buff[y+1][x] = madd(buff[y+1][x], mscale(qerr, 5/16));
          if (x+1 < ww) {
            buff[y+1][x+1] = madd(buff[y+1][x+1], mscale(qerr, 1/16));
          }
        }
      } 
    }
    for (let y = 0; y < wh; y++) {
      for (let x = 0; x < ww; x++) {
        setp(x, y, buff[y][x]);
      }
    }
    updatePixels();
    fc += 1;
  }
  p0before = p0;
  p1before = p1;
  p2before = p2;
  p3before = p3;
}

function madd(a, b) {
  return [a[0]+b[0],a[1]+b[1],a[2]+b[2]]
}

function mscale(m, s) {
  return [s*m[0],s*m[1],s*m[2]]
}

function Bez(t, p0, p1, p2, p3) {
  c = (1-t)
  return [c*c*c*p0[0]+3*c*c*t*p1[0]+3*c*t*t*p2[0]+t*t*t*p3[0], c*c*c*p0[1]+3*c*c*t*p1[1]+3*c*t*t*p2[1]+t*t*t*p3[1], c*c*c*p0[2]+3*c*c*t*p1[2]+3*c*t*t*p2[2]+t*t*t*p3[2]]
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 10);
}