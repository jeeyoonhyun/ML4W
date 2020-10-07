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

  rightEyebrowUpper: [156, 70, 63, 105, 66, 107, 55, 193],
  rightEyebrowLower: [35, 124, 46, 53, 52, 65],

  leftEyeUpper0: [466, 388, 387, 386, 385, 384, 398],
  leftEyeLower0: [263, 249, 390, 373, 374, 380, 381, 382, 362],
  leftEyeUpper1: [467, 260, 259, 257, 258, 286, 414],
  leftEyeLower1: [359, 255, 339, 254, 253, 252, 256, 341, 463],
  leftEyeUpper2: [342, 445, 444, 443, 442, 441, 413],
  leftEyeLower2: [446, 261, 448, 449, 450, 451, 452, 453, 464],
  leftEyeLower3: [372, 340, 346, 347, 348, 349, 350, 357, 465],

  leftEyebrowUpper: [383, 300, 293, 334, 296, 336, 285, 417],
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
  createCanvas(windowWidth*0.8, windowHeight*0.8);
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

  // hand pose (deleted because of performance issues)
  // drawKeypoints();

  //silhouette / cheeks
  drawDimension('lightpink','silhouette', 'rgba(255,255,255, 0.05)');
  drawDimension('lightpink','rightCheek', 'rgba(255,255,255, 0.05)');
  drawDimension('lightpink','leftCheek', 'rgba(255,255,255, 0.05)');

  // draw lines for silhouette
  drawLines('silhouette');


  //lips
  drawDimension('aqua','lipsUpperOuter', 'rgba(255,255,255, 0.05)');
  drawDimension('aqua','lipsLowerOuter', 'rgba(255,255,255, 0.05)');
  drawDimension('aqua','lipsUpperInner', 'rgba(255,255,255, 0.05)');
  drawDimension('aqua','lipsLowerInner', 'rgba(255,255,255, 0.05)');

  //rightEye
  drawDimension('lightgreen','rightEyeUpper0', 'rgba(255,255,255, 0.05)');
  drawDimension('lightgreen','rightEyeLower0', 'rgba(255,255,255, 0.05)');
  // drawDimension('lightgreen','rightEyeUpper1', 'rgba(255,255,255, 0.05)');
  // drawDimension('lightgreen','rightEyeLower1', 'rgba(255,255,255, 0.05)');
  // drawDimension('lightgreen','rightEyeUpper2', 'rgba(255,255,255, 0.05)');
  // drawDimension('lightgreen','rightEyeLower2', 'rgba(255,255,255, 0.05)');
  // drawDimension('lightgreen','rightEyeLower3', 'rgba(255,255,255, 0.05)');
  drawDimension('lightgreen','rightEyebrowUpper', 'rgba(255,255,255, 0.05)');
  drawDimension('lightgreen','rightEyebrowLower', 'rgba(255,255,255, 0.05)');

  //leftEye
  drawDimension('lightgreen','leftEyeUpper0', 'rgba(255,255,255, 0.05)');
  drawDimension('lightgreen','leftEyeLower0', 'rgba(255,255,255, 0.05)');
  // drawDimension('lightgreen','leftEyeUpper1', 'rgba(255,255,255, 0.05)');
  // drawDimension('lightgreen','leftEyeLower1', 'rgba(255,255,255, 0.05)');
  // drawDimension('lightgreen','leftEyeUpper2', 'rgba(255,255,255, 0.05)');
  // drawDimension('lightgreen','leftEyeLower2', 'rgba(255,255,255, 0.05)');
  // drawDimension('lightgreen','leftEyeLower3', 'rgba(255,255,255, 0.05)');
  drawDimension('lightgreen','leftEyebrowUpper', 'rgba(255,255,255, 0.05)');
  drawDimension('lightgreen','leftEyebrowLower', 'rgba(255,255,255, 0.05)');

  //nose
  drawDimension('DarkSeaGreen','midwayBetweenEyes', 'rgba(255,255,255, 0.05)');
  drawDimension('DarkSeaGreen','noseTip', 'rgba(255,255,255, 0.05)');
  drawDimension('DarkSeaGreen','noseBottom', 'rgba(255,255,255, 0.05)');
  drawDimension('DarkSeaGreen','noseRightCorner', 'rgba(255,255,255, 0.05)');
  drawDimension('DarkSeaGreen','noseLeftCorner', 'rgba(255,255,255, 0.05)');
}

function drawLines(area) {

  stroke(0);
  strokeWeight(0.05);
    for (let a = 30; a < windowWidth; a+= 60) {
      if (a <= 30 || a > windowHeight - 60) {
        for (let b = 30; b < windowHeight; b+=60) {
          areaPoints.push([a,b]);
        }
      } else {
        for (let b = 30; b <= windowHeight; b+=60) {
          if(b <= 30 || b >= windowHeight - 240) {
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
        strokeWeight(0.3);

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