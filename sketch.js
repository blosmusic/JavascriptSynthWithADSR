//Ben Lamb O'Sullivan - hi@benlambosullivan.com
//Basic Synth with ADSR

let wave;
let waveType;
let radio;

//Waveform wave types
let sineWave = 'sine';
let triangleWave = 'triangle';
let sawtoothWave = 'sawtooth';
let squareWave = 'square';

//initial parameters
let button;
let frequencySlider;
let volumeSlider;
let playing = false;

//ADSR envelope
let adsrEnvelope;
let attackSlider;
let decaySlider;
let sustainSlider;
let releaseSlider;

function setup() {
  createCanvas(1000, 200);
  background(0);

  //ADSR
  adsrEnvelope = new p5.Env();
  adsrEnvelope.setADSR(0.5, 0.25, 0.5, 0.1);
  adsrEnvelope.setRange(0.8, 0);

  attackSlider = createSlider(0, 1, 0.15, 0.01);
  attackSlider.position(10, 70);
  attackSlider.style('width', '100px');
  decaySlider = createSlider(0, 1, 0.25, 0.01);
  decaySlider.position(120, 70);
  decaySlider.style('width', '100px');
  sustainSlider = createSlider(0, 1, 0.5, 0.01);
  sustainSlider.position(230, 70);
  sustainSlider.style('width', '100px');
  releaseSlider = createSlider(0, 1, 0.1, 0.01);
  releaseSlider.position(340, 70);
  releaseSlider.style('width', '100px');

  //set ocsillator parameters -  order is important
  wave = new p5.Oscillator();
  frequencySlider = createSlider(50, 5000, 440, 0.1);
  frequencySlider.position(130, 10);
  frequencySlider.style('width', '300px');

  // frequencySlider.text('FREQ');
  volumeSlider = createSlider(0.0, 1.0, 0.3, 0.1);
  volumeSlider.position(630, 10);
  volumeSlider.style('width', '300px');

  //wave types: 'sine', 'triangle', 'sawtooth' 'square'
  radio = createRadio();
  radio.option(sineWave, 'sin');
  radio.option(triangleWave, 'tri');
  radio.option(sawtoothWave, 'saw');
  radio.option(squareWave, 'squ');
  radio.position(510, 70, 200, 500);
  radio.style('width', '500px');

  // wave.setType('sine');
  // wave.freq(440);
  wave.start();
  wave.amp(adsrEnvelope);

  button = createButton('play note');
  button.mousePressed(toggle);
}

function draw() {
  let volumeValue = volumeSlider.value();
  let freqValue = frequencySlider.value();
  let attackValue = attackSlider.value();
  let decayValue = decaySlider.value();
  let sustainValue = sustainSlider.value();
  let releaseValue = releaseSlider.value();

  waveType = radio.value();
  wave.setType(waveType);
  wave.freq(freqValue);
  adsrEnvelope.setADSR(attackValue, decayValue, sustainValue, releaseValue);
  masterVolume(volumeValue);

  //==========GRAPHICS==========
  //TODO replace this background with createCanvas
  background(120);
  fill(255);
  textSize(20);
  text('FREQ: ' + freqValue, 10, 25);
  text('VOLUME', 510, 25);
  text('ATT', 10, 50, 60, 30);
  text('DEC', 120, 50, 60, 30);
  text('REL', 230, 50, 60, 30);
  text('SUS', 340, 50, 60, 30);
  text('WAVE', 510, 50, 100, 200);

}

function toggle() {
  adsrEnvelope.play();
}
