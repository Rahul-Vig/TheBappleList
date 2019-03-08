let granimInstance = new Granim({
  element: "#canvas-image-blending",
  direction: "top-bottom",
  isPausedWhenNotInView: true,
  image: {
    source: "./assets/images/header_top.jpg",
    position: ["center", "top"],
    stretchMode: ["stretch-if-bigger", "stretch-if-bigger"],
    blendingMode: "multiply"
  },
  states: {
    "default-state": {
      gradients: [
        ["#29323c", "#485563"],
        ["#FF6B6B", "#556270"],
        ["#c9eafb", "#7ea0c4"],
        ["#f0ab51", "#eceba3"]
      ],
      transitionSpeed: 10000
    }
  }
});

granimInstance.play();
let ctx = document.getElementById("canvas-image-blending").getContext("2d");
console.log(ctx);
ctx.fillStyle = "white";
ctx.font = "48px";
ctx.fillText("Hello world", 10, 50);
