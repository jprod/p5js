function setup() {
  var canvas = createCanvas(windowWidth, windowHeight - 10);
  // var canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');
  background(200, 210, 220);
  frameRate(50);
}

class Quadra {
  constructor(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
    this.x1 = x1;
    this.y1 = y1;
    this.z1 = z1;
    this.x2 = x2;
    this.y2 = y2;
    this.z2 = z2;
    this.x3 = x3;
    this.y3 = y3;
    this.z3 = z3;
    this.x4 = x4;
    this.y4 = y4;
    this.z4 = z4;
  }

  // Project and truncate z dim
  project() {
    quad(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
  }

  tran(x, y, z) {
    this.x1 = this.x1 + x;
    this.y1 = this.y1 + y;
    this.z1 = this.z1 + z;
    this.x2 = this.x2 + x;
    this.y2 = this.y2 + y;
    this.z2 = this.z2 + z;
    this.x3 = this.x3 + x;
    this.y3 = this.y3 + y;
    this.z3 = this.z3 + z;
    this.x4 = this.x4 + x;
    this.y4 = this.y4 + y;
    this.z4 = this.z4 + z;
    return this;
  }

  rot(x, y, z, a, b, g) {
    this.tran(x*-1, y*-1, z*-1);
    let _x1=this.rotx(this.x1,this.y1,this.z1,a,b,g);
    let _y1=this.roty(this.x1,this.y1,this.z1,a,b,g);
    let _z1=this.rotz(this.x1,this.y1,this.z1,a,b,g);
    let _x2=this.rotx(this.x2,this.y2,this.z2,a,b,g);
    let _y2=this.roty(this.x2,this.y2,this.z2,a,b,g);
    let _z2=this.rotz(this.x2,this.y2,this.z2,a,b,g);
    let _x3=this.rotx(this.x3,this.y3,this.z3,a,b,g);
    let _y3=this.roty(this.x3,this.y3,this.z3,a,b,g);
    let _z3=this.rotz(this.x3,this.y3,this.z3,a,b,g);
    let _x4=this.rotx(this.x4,this.y4,this.z4,a,b,g);
    let _y4=this.roty(this.x4,this.y4,this.z4,a,b,g);
    let _z4=this.rotz(this.x4,this.y4,this.z4,a,b,g);
    this.x1=_x1;
    this.y1=_y1;
    this.z1=_z1;
    this.x2=_x2;
    this.y2=_y2;
    this.z2=_z2;
    this.x3=_x3;
    this.y3=_y3;
    this.z3=_z3;
    this.x4=_x4;
    this.y4=_y4;
    this.z4=_z4;
    this.tran(x, y, z);
    return this;
  }

  roto(o) {
    this.rot(o.x,o.y,o.z,o.a,o.b,o.g);
    return this;
  }

  rotx(x,y,z,a,b,g) {
    return cos(a)*cos(b)*x+(cos(a)*sin(b)*sin(g)-sin(a)*cos(g))*y+(cos(a)*sin(b)*cos(g)+sin(a)*sin(g))*z;
  }

  roty(x,y,z,a,b,g) {
    return sin(a)*cos(b)*x+(sin(a)*sin(b)*sin(g)+cos(a)*cos(g))*y+(sin(a)*sin(b)*cos(g)-cos(a)*sin(g))*z;
  }

  rotz(x,y,z,a,b,g) {
    return -1*sin(b)*x+cos(b)*sin(g)*y+cos(b)*cos(g)*z;
  }

  avgz() {
    return (this.z1+this.z2+this.z3+this.z4)/4
  }
}

// let noiseScale=255;
// let cellSize = 100;
let fc = 0
var bar = false
var started = false

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
  let R2 = sqrt(2);
  let ww = windowWidth;
  let mw = (ww/2);
  let wh = windowHeight;
  let mh = (wh/2);
  let rot0 = {x:mw,y:mh,z:0,a:0,b:PI/4,g:0}
  let rot1 = {x:mw,y:mh,z:0,a:0,b:0,g:(fc/100)*PI}
  let s1 = {obj: new Quadra(mw+380+sin(fc/10)*0, mh+310, 200, mw-380, mh+310, 200, mw-380, mh-310, 200, mw+380, mh-310, 200).roto(rot0).roto(rot1), color:color(227, 54, 77)}
  let slist = [s1]
  background(200, 201, 227);
  noStroke();
  slist.sort((a, b) => a.obj.avgz() - b.obj.avgz());
  for (let i=0; i < 1; i++) {
    fill(slist[i].color);
    slist[i].obj.project();
  }
  fc += 1;
  bbout(fc);
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