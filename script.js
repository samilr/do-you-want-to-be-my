

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
  { front: 'red', back: 'darkred' },
  { front: 'green', back: 'darkgreen' },
  { front: 'blue', back: 'darkblue' },
  { front: 'yellow', back: 'darkyellow' },
  { front: 'orange', back: 'darkorange' },
  { front: 'pink', back: 'darkpink' },
  { front: 'purple', back: 'darkpurple' },
  { front: 'turquoise', back: 'darkturquoise' }];

resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30)
      },

      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1
      },

      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1
      },

      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50)
      }
    });


  }
};

render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetti
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  // Fire off another round of confetti
  if (confetti.length <= 10) initConfetti();

  window.requestAnimationFrame(render);
};

window.addEventListener('resize', function () {
  resizeCanvas();
});

window.addEventListener('click', function () {
  initConfetti();
});

const audioDefault = document.getElementById("audioDefault");
const btnYes = document.getElementById('yes');
const btnNot = document.getElementById('not');
const textDefault = document.getElementById('textDefault');
const textYes = document.getElementById('textYes');
const audioYes = document.getElementById("audioYes");

const playButton = document.querySelector(".play-button");
const imagenDefault = document.getElementById('imgDefault');
const imagenYes = document.getElementById('imgYes');
const div = document.getElementById('startApp');
const card  = document.getElementById('card');

document.addEventListener('click', function () {
  if (audioDefault.paused) {
      audioDefault.play();
  } else {
      audioDefault.pause();
  }
  div.style.display = 'none';
  card.style.display = 'block';
});

  
function saysYes() {
  initConfetti();
  render();
  if (!audioDefault.paused) {
    audioDefault.pause(); // Pausar el audio aquí
  }
  audioYes.play();
  imagenDefault.style.display = 'none';
  btnYes.style.display = 'none';
  btnNot.style.display = 'none';
  textDefault.style.display = 'none';
  imagenYes.style.display = 'block';
  textYes.style.display = 'block';
}


function avoid() {
  width = 300
  height = 400

  newWidth = (Math.random() * width);
  newHeight = (Math.random() * height);

  document.getElementById('not').style.position = 'absolute';
  document.getElementById('not').style.top = newHeight + 'px';
  document.getElementById('not').style.left = newWidth + 'px';
}

btnYes.addEventListener('click', saysYes);