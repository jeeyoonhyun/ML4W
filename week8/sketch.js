const model = new rw.HostedModel({
    url: "https://arbitrary-image-stylization-sky.hosted-models.runwayml.cloud/v1/",
    token: "rLTYVSdP5bKH4NMVXeZSvA==",
  });
  //// You can use the info() method to see what type of input object the model expects
  // model.info().then(info => console.log(info));
  const inputs = {
    "content_image": "<base 64 image>",
    "style_image": "<base 64 image>",
    "interpolation_weight": "<number>"
  };
  model.query(inputs).then(outputs => {
    const { image } = outputs;
    // use the outputs in your project
  });
