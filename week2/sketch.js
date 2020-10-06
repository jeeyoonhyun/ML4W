// // Create a KNN classifier
// const knnClassifier = ml5.KNNClassifier();

// // Create a featureExtractor that can extract features of an image
// const featureExtractor = ml5.featureExtractor('MobileNet', modelReady);

// // Get the features of an image
// const features = featureExtractor.infer(myImg);

// // Add an example with a label to the KNN Classifier
// knnClassifier.addExample(features, label);

// // Use KNN Classifier to classify these features
// knnClassifier.classify(features, (err, result) => {
//   console.log(result); // result.label is the predicted label
// });


let width;
let height;

let x = width/2;
let y = height/2;

let video;
let features;
let knn;
let label;
let labelP;
let ready = false;


function setup () {
    let width = 640;
    let height = 320;
    createCanvas(width,height);

    
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    features = ml5.featureExtractor('MobileNet', modelReady);
    

    labelP = createP('need training data');
    labelP.addClass('big');
    

}


function keyPressed() {
    const logits = features.infer(video);
    if (key == 'l') {
        knn.addExample(logits, "left");
        console.log('training left');
    } else if (key == 'r') {
        knn.addExample(logits, "right");
        console.log('training right');
    } else if (key == 'u') {
        knn.addExample(logits, "up");
        console.log('training up');
    }else if (key == 'd') {
        knn.addExample(logits, "down");
        console.log('training down');
    } else if (key == "s") {
        knn.save("knn.json");
    }
    // gives you an array of logits (tfjs)
    // const logits = features.infer(video);
    // console.log(logits.dataSync()); 
    // logits.print();
}

function modelReady() {
    console.log("MobileNet loaded");
    knn = ml5.KNNClassifier();
    knn.load('knn.json', function() {
        console.log('KNN Data Loaded')
        goClassify();
    })

}

function goClassify() {
    const logits = features.infer(video);
    knn.classify(logits, function(error, result){
        if (error) {
            console.error(error);
        } else {
            label = result.label;
            labelP.html(label);
            console.log(result);
            goClassify();
        }
    })
}

function draw () {
    
    //move image by the width of image to the left
    translate(video.width, 0);
    //then scale it by -1 in the x-axis
    //to flip the image
    scale(-1, 1);
    //draw video capture feed as image inside p5 canvas
    image(video,0,0);

    ellipse(50,50,16);
    if (!ready && knn.getNumLabels() > 0) {
        goClassify();
        ready = true;
    }

    if (label == "up") {
        y--;
    } else if (label == "down") {
        y++;
    } else if (label == "right") {
        x++;
    } else if (label == "left"){
        x--;
    }
}




