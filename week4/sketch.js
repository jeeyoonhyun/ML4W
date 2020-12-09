let facemesh;
let video;
let facePred = [];
let handPred = [];
let areaPoints = [];

// mesh annotations
// source: https://github.com/tensorflow/tfjs-models/blob/master/facemesh/src/keypoints.ts
const mesh = {
  silhouette: [
    10,  338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288,
    397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136,
    172, 58,  132, 93,  234, 127, 162, 21,  54,  103, 67,  109
  ],

  lipsUpperOuter: [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291],
  lipsLowerOuter: [146, 91, 181, 84, 17, 314, 405, 321, 375, 291],
  lipsUpperInner: [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308],
  lipsLowerInner: [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308],

  rightEyeUpper0: [246, 161, 160, 159, 158, 157, 173],
  rightEyeLower0: [33, 7, 163, 144, 145, 153, 154, 155, 133],
  rightEyeUpper1: [247, 30, 29, 27, 28, 56, 190],
  rightEyeLower1: [130, 25, 110, 24, 23, 22, 26, 112, 243],
  rightEyeUpper2: [113, 225, 224, 223, 222, 221, 189],
  rightEyeLower2: [226, 31, 228, 229, 230, 231, 232, 233, 244],
  rightEyeLower3: [143, 111, 117, 118, 119, 120, 121, 128, 245],

  rightEyebrowUpper: [70, 63, 105, 66, 107,],
  rightEyebrowLower: [35, 124, 46, 53, 52, 65],

  leftEyeUpper0: [466, 388, 387, 386, 385, 384, 398],
  leftEyeLower0: [263, 249, 390, 373, 374, 380, 381, 382, 362],
  leftEyeUpper1: [467, 260, 259, 257, 258, 286, 414],
  leftEyeLower1: [359, 255, 339, 254, 253, 252, 256, 341, 463],
  leftEyeUpper2: [342, 445, 444, 443, 442, 441, 413],
  leftEyeLower2: [446, 261, 448, 449, 450, 451, 452, 453, 464],
  leftEyeLower3: [372, 340, 346, 347, 348, 349, 350, 357, 465],

  leftEyebrowUpper: [300, 293, 334, 296, 336,],
  leftEyebrowLower: [265, 353, 276, 283, 282, 295],

  midwayBetweenEyes: [168],

  noseTip: [1],
  noseBottom: [2],
  noseRightCorner: [98],
  noseLeftCorner: [327],

  rightCheek: [205],
  leftCheek: [425]
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  video = createCapture(VIDEO);
  video.size(width, height);

  // face mesh
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    facePred = results;  
  });
  
  // hand pose (deleted because of performance issues)
  // handpose = ml5.handpose(video, modelReady);
  // handpose.on("predict", results => {
  //   handPred = results;
  // });
  video.hide();

}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  blendMode(BLEND);
  background(255);

//   hand pose (deleted because of performance issues)
//   drawKeypoints();

  //silhouette / cheeks
  drawBox('black','silhouette', 'rgba(255,255,255, 0.05)',6);
  // drawBox('lightpink','rightCheek', 'rgba(255,255,255, 0.05)');
  // drawBox('lightpink','leftCheek', 'rgba(255,255,255, 0.05)');

  // draw lines for silhouette
  // drawLines('silhouette');


  //lips
  drawBox('black','lipsUpperOuter', 'rgba(255,255,255, 0.05)');
  drawBox('black','lipsLowerOuter', 'rgba(255,255,255, 0.05)');
  drawBox('black','lipsUpperInner', 'rgba(255,255,255, 0.05)');
  drawBox('black','lipsLowerInner', 'rgba(255,255,255, 0.05)');

  //rightEye
  drawBox('black','rightEyeUpper0', 'rgba(255,255,255, 0.05)',4);
  drawBox('black','rightEyeLower0', 'rgba(255,255,255, 0.05)',4);
  // drawBox('black','rightEyeUpper1', 'rgba(255,255,255, 0.05)',4);
  // drawBox('black','rightEyeLower1', 'rgba(255,255,255, 0.05)',4);
  // drawBox('black','rightEyeUpper2', 'rgba(255,255,255, 0.05)',4);
  // drawBox('black','rightEyeLower2', 'rgba(255,255,255, 0.05)',4);
  // drawBox('black','rightEyeLower3', 'rgba(255,255,255, 0.05)',4);
  drawBox('black','rightEyebrowUpper', 'rgba(255,255,255, 0.05)',4);
  // drawBox('black','rightEyebrowLower', 'rgba(255,255,255, 0.05)',4);

  //leftEye
  drawBox('black','leftEyeUpper0', 'rgba(255,255,255, 0.05)',4);
  drawBox('black','leftEyeLower0', 'rgba(255,255,255, 0.05)',4);
  // drawBox('black','leftEyeUpper1', 'rgba(255,255,255, 0.05)');
  // drawBox('black','leftEyeLower1', 'rgba(255,255,255, 0.05)');
  // drawBox('black','leftEyeUpper2', 'rgba(255,255,255, 0.05)');
  // drawBox('black','leftEyeLower2', 'rgba(255,255,255, 0.05)');
  // drawBox('black','leftEyeLower3', 'rgba(255,255,255, 0.05)');
  drawBox('black','leftEyebrowUpper', 'rgba(255,255,255, 0.05)');
  // drawBox('black','leftEyebrowLower', 'rgba(255,255,255, 0.05)');

  //nose
  // drawBox('black','midwayBetweenEyes', 'rgba(255,255,255, 0.05)');
  drawBox('black','noseTip', 'rgba(255,255,255, 0.05)');
  drawBox('black','noseBottom', 'rgba(255,255,255, 0.05)');
  drawBox('black','noseRightCorner', 'rgba(255,255,255, 0.05)');
  drawBox('black','noseLeftCorner', 'rgba(255,255,255, 0.05)');
}

function drawBox(color = 'black', area, fillColor, size = 4) {
  for (let i = 0; i < facePred.length; i += 1) {
    const keypoints = facePred[i].scaledMesh;
    for (let j = 0; j < keypoints.length - 2; j++) {
      if (mesh[area].includes(j)) {
        const [x, y] = keypoints[j];
        const [newx, newy] = keypoints[j+1];
        const [lerpx, lerpy] = [lerp(x, newx, 0.2), lerp(y, newy, 0.2)]
        stroke(color);
        fill(fillColor);
        push();
        translate(x-windowWidth/2,y-windowHeight/2);
        rotateX(frameCount * 0.05);
        rotateY(frameCount * 0.05);
        box(size);
        pop();
      }
    }
  }
}

function drawLines(area) {
  stroke(0);
  strokeWeight(0.05);
    for (let a = -windowWidth/2 ; a < windowWidth/2; a+= 60) {
      if (a <= -windowHeight/2 || a > windowHeight/2) {
        for (let b = 30 - windowHeight/2; b < windowHeight/2; b+=60) {
          areaPoints.push([a,b]);
        }
      } else {
        for (let b = -windowHeight/2; b <= windowHeight/2; b+=60) {
          if(b <= -windowHeight/2 || b >= windowHeight/2) {
            areaPoints.push([a,b]);
          }
        }
      }
    }

  for (let i = 0; i < facePred.length; i += 1) {
    const keypoints = facePred[i].scaledMesh;
    for (let j = 0; j < keypoints.length - 2; j++) {
      if (mesh[area].includes(j)) {
        const [x, y] = keypoints[j];
        beginShape(LINES);
        vertex(x,y);
        vertex(areaPoints[Math.floor(random(areaPoints.length))][0],areaPoints[Math.floor(random(areaPoints.length))][1]);
        endShape();
      }
    }
  }
}

function drawDimension(color, area, fillColor) {
  
  blendMode(DARKEST);
  for (let i = 0; i < facePred.length; i += 1) {
    const keypoints = facePred[i].scaledMesh;
    for (let j = 0; j < keypoints.length - 2; j++) {
      if (mesh[area].includes(j)) {
        const [x, y] = keypoints[j];
        const [newx, newy] = keypoints[j+1];
        const [lerpx, lerpy] = [lerp(x, newx, 0.2), lerp(y, newy, 0.2)]
       
        stroke(color);
        fill(fillColor);
        strokeWeight(0.5);

        ellipse(x,y,3,3);
        beginShape(TRIANGLES);
          vertex(lerpx,lerpy);
          vertex(keypoints[j+1][0],keypoints[j+1][1]);
          vertex(keypoints[j+2][0],keypoints[j+2][1]);
        endShape();
      }
    }
  }
  
  
}

// hand pose (deleted because of performance issues)
// function drawKeypoints() {
//   for (let i = 0; i < facePred.length; i += 1) {
//     const keypoints = facePred[i].scaledMesh;
    
//     // hand
//     for (let i = 0; i < handPred.length; i += 1) {
//       const prediction = handPred[i];
//       for (let j = 0; j < prediction.landmarks.length; j += 1) {
//         const keypoint = prediction.landmarks[j];

//         stroke('cornflowerblue');
//         fill('rgba(0,0,0, 0.05)');
//         strokeWeight(0.5);
//         beginShape(LINES);
//         vertex(keypoint[0], keypoint[1]);
//         vertex(keypoint[2], keypoint[3]);
//         endShape();

//         ellipse(keypoint[0], keypoint[1], 2, 2);
//       }
//     }
//   }
// }
  