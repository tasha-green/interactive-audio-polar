import * as THREE from "/libs/three.module.js";
import { FirstPersonControls } from "/libs/FirstPersonControls.js";
import { Lensflare, LensflareElement } from "/libs/Lensflare.js";

var scene, renderer, camera, controls;
var geo, mat, mesh;
var listen, audioLoad;

const clock = new THREE.Clock();

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", init);

function init() {
  const overlay = document.getElementById("overlay");
  overlay.remove();

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#000524");

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    2,
    5000
  );
  camera.position.z = 1000;

  // Camera audio listener
  listen = new THREE.AudioListener();
  camera.add(listen);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 1000;
  controls.lockSpeed = 0.1;

  document.body.style.touchAction = "none";

  // Fog
  scene.fog = new THREE.Fog(scene.background, 3500, 15000);

  geo = new THREE.BoxBufferGeometry(20, 20, 1500);
  mat = new THREE.MeshPhongMaterial({
    color: "#FFFFFF",
    specular: "#FFFFFF",
    shininess: 100
  });

  for (let x = 0; x < 3000; x++) {
    mesh = new THREE.Mesh(geo, mat);
    mesh.position.x = 8000 * (2 * Math.random() - 1);
    mesh.position.y = 8000 * (2 * Math.random() - 1);
    mesh.position.z = 8000 * (2 * Math.random() - 1);

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    scene.add(mesh);
  }

  audioLoad = new THREE.AudioLoader();

  const beat = new THREE.Audio(listen);
  audioLoad.load("/sound/Bass_beat.wav", function (buffer) {
    beat.setBuffer(buffer);
    beat.setLoop(true);
    beat.setVolume(0.5);
    beat.play();
  });

  const exhale = new THREE.PositionalAudio(listen);
  audioLoad.load("/sound/Exhale.wav", function (buffer) {
    exhale.setBuffer(buffer);
    exhale.setRefDistance(300);
    exhale.setVolume(1.0);
    exhale.setLoop(true);
    exhale.play();
  });

  const whisper = new THREE.PositionalAudio(listen);
  audioLoad.load("/sound/Whisper.wav", function (buffer) {
    whisper.setBuffer(buffer);
    whisper.setRefDistance(300);
    whisper.setVolume(1.0);
    whisper.setLoop(true);
    whisper.play();
  });

  const whisper_loud = new THREE.PositionalAudio(listen);
  audioLoad.load("/sound/Whisper_Loud.wav", function (buffer) {
    whisper_loud.setBuffer(buffer);
    whisper_loud.setRefDistance(200);
    whisper_loud.setVolume(1.0);
    whisper_loud.setLoop(true);
    whisper_loud.play();
  });

  const hum = new THREE.PositionalAudio(listen);
  audioLoad.load("/sound/Hum.wav", function (buffer) {
    hum.setBuffer(buffer);
    hum.setRefDistance(100);
    hum.setVolume(0.5);
    hum.setLoop(true);
    hum.play();
  });

  const piano = new THREE.PositionalAudio(listen);
  audioLoad.load("/sound/piano_chords.wav", function (buffer) {
    piano.setBuffer(buffer);
    piano.setRefDistance(100);
    piano.setVolume(0.8);
    piano.setLoop(true);
    piano.play();
  });

  const subass = new THREE.PositionalAudio(listen);
  audioLoad.load("/sound/subass.wav", function (buffer) {
    subass.setBuffer(buffer);
    subass.setRefDistance(800);
    subass.setVolume(1.0);
    subass.setLoop(true);
    subass.play();
  });

  const low_chord = new THREE.PositionalAudio(listen);
  audioLoad.load("/sound/low_chord.wav", function (buffer) {
    low_chord.setBuffer(buffer);
    low_chord.setRefDistance(800);
    low_chord.setVolume(0.7);
    low_chord.setLoop(true);
    low_chord.play();
  });

  const high_pitch = new THREE.PositionalAudio(listen);
  audioLoad.load("/sound/highPitch.wav", function (buffer) {
    high_pitch.setBuffer(buffer);
    high_pitch.setRefDistance(200);
    high_pitch.setVolume(0.8);
    high_pitch.setLoop(true);
    high_pitch.play();
  });

  // Lensflares
  const textureLoad = new THREE.TextureLoader();
  const flareMain = textureLoad.load("/textures/flareMain.png");
  const flareSide = textureLoad.load("/textures/flareSide.png");

  function light(H, S, L, x, y, z, sound) {
    const plight = new THREE.PointLight("#FFFFFF", 0.8, 1500);
    plight.color.setHSL(H, S, L);
    plight.position.set(x, y, z);
    scene.add(plight);

    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(flareMain, 700, 0, plight.color));
    lensflare.addElement(new LensflareElement(flareSide, 60, 0.6));
    lensflare.addElement(new LensflareElement(flareSide, 70, 0.7));
    lensflare.addElement(new LensflareElement(flareSide, 120, 0.9));
    lensflare.addElement(new LensflareElement(flareSide, 70, 1));
    plight.add(lensflare);

    plight.add(sound);
  }
  function lightTwo(H, S, L, x, y, z, sound1, sound2) {
    const plight2 = new THREE.PointLight("#FFFFFF", 0.8, 1500);
    plight2.color.setHSL(H, S, L);
    plight2.position.set(x, y, z);
    scene.add(plight2);

    const lensflare = new Lensflare();
    lensflare.addElement(
      new LensflareElement(flareMain, 700, 0, plight2.color)
    );
    lensflare.addElement(new LensflareElement(flareSide, 60, 0.6));
    lensflare.addElement(new LensflareElement(flareSide, 70, 0.7));
    lensflare.addElement(new LensflareElement(flareSide, 120, 0.9));
    lensflare.addElement(new LensflareElement(flareSide, 70, 1));
    plight2.add(lensflare);

    plight2.add(sound1);
    plight2.add(sound2);
  }

  lightTwo(0.32, 0.11, 0.2, -250, 0, -8000, exhale, low_chord); //black
  light(0.32, 0.11, 0.2, 250, 0, -8000, subass); //black

  lightTwo(0.08, 1.0, 0.5, 250, 0, -6000, whisper_loud, piano); //orange
  lightTwo(0.08, 1.0, 0.5, -250, 0, -6000, whisper, low_chord); //orange

  lightTwo(0.7, 1.0, 0.65, -250, 0, -4000, whisper_loud, low_chord); //purple

  light(1.0, 1.0, 0.45, 250, 0, -2000, low_chord); //red

  light(0.6, 0.9, 0.8, -250, 0, 0, subass); //white

  light(0.66, 0.9, 0.55, 250, 0, 2000, subass); //blue

  lightTwo(1.0, 1.0, 0.45, -250, 0, 4000, low_chord, subass); //red

  lightTwo(0.32, 0.11, 0.5, 250, 0, 6000, low_chord, subass); //grey
  lightTwo(0.32, 0.11, 0.5, -250, 0, 6000, hum, subass); //grey

  lightTwo(0.32, 0.11, 0.2, 250, 0, 8000, high_pitch, subass); //black
  lightTwo(0.32, 0.11, 0.2, -250, 0, 8000, hum, low_chord); //black

  window.addEventListener("resize", onWindowResize, false);

  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
}

function render() {
  const delta = clock.getDelta();

  controls.update(delta);
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}
