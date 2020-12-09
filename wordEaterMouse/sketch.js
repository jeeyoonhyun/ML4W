let facemesh;
let video;
let facePred = [];
let handPred = [];
let areaPoints = [];
let particles = [];
let font;
let wordlist = ["f", "he", "described", "a", "simple", "app", "for", "posting", "and", "viewing", "photos", "as", "a", "user", "would", "on", "nstagram", "the", "system", "generated", "the", "code", "needed", "to", "build", "it", "his", "code", "was", "sometimes", "flawed", "ut", "typically", "if", "r", "inger", "made", "just", "a", "tweak", "or", "two", "it", "worked", "as", "he", "wanted", "ts", "not", "absolutely", "perfect", "he", "said", "ut", "it", "is", "very", "very", "close"];
let selectedWords = [];

// particles
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
    constructor(){
      this.x = random(0,width);
      this.y = random(0,height);
      this.r = random(1,8);
      this.xSpeed = random(-1,1);
      this.ySpeed = random(-1,1.5);
      this.word = random(wordlist); //assign a random word to the particle
    }
  
  // creation of a particle.
    createParticle() {
      stroke('black');
      
      push();
      translate(this.x-windowWidth/2,this.y-windowHeight/2);
      if (dist(mouseX, mouseY, this.x, this.y) < 50) {
        fill('black');
        stroke('white');
        rotateX(frameCount * 0.05);
        rotateY(frameCount * 0.05);
        box(this.r*2);
      } else {
        box(this.r);
      }
      pop();

      push();
      translate(this.x-windowWidth/2,this.y-windowHeight/2);
      if (dist(mouseX, mouseY, this.x, this.y) < 50) {
        textAlign(CENTER, CENTER);
        fill('black');
        textSize(14 + this.r/2);
        textFont(font);
        text(this.word,0,12);
      }
      pop();
    }
  
  // setting the particle in motion.
    moveParticle() {
      if(this.x < 0 || this.x > width)
        this.xSpeed*=-1;
      if(this.y < 0 || this.y > height)
        this.ySpeed*=-1;
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
    }
  }

function preload() {
  font = loadFont('./OpenSans.ttf');
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0,0);
  canvas.style('z-index','-1')
  
  for(let i = 0;i<width/10;i++){
    particles.push(new Particle());
  }
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  if (selectedWords.join(' ').length > 300) {
    selectedWords = [];
  }

  blendMode(BLEND);
  background(255);

  ellipse(mouseX-windowWidth/2, mouseY-windowHeight/2, 100);

  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    if (dist(mouseX, mouseY, particles[i].x, particles[i].y) < 50 && mouseIsPressed) {
      particles.splice(i,1)
      selectedWords.push(particles[i].word);
    }
    particles[i].moveParticle();
  }
    push();
    fill('black');
    textFont(font);
    textSize(60);
    text(selectedWords.join(' '),-windowWidth/2+40,-windowHeight/2+40, windowWidth-80,windowHeight-80);
    pop();
}
  