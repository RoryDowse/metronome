import Timer from './timer.js';

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');

const click1 = new Audio('click1.mp3');
const click2 = new Audio('click2.mp3');

let bpm = 120;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = 'Allegro';

decreaseTempoBtn.addEventListener('click', () => {
    bpm--;
    if (bpm <= 40) { return };
    updateMetronome();
});
increaseTempoBtn.addEventListener('click', () => {
    bpm++;
    updateMetronome();
});
tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    updateMetronome();
});

subtractBeats.addEventListener('click', () => {
    if (beatsPerMeasure <= 1) { return };
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});
addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 12) { return };
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

startStopBtn.addEventListener('click', () => {
    count = 0;
    if (!isRunning) {
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP';
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START';
    }
})

function updateMetronome() {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;
    
    if (bpm >= 40 && bpm <= 59) { tempoTextString = "Largo" };
    if (bpm >= 60 && bpm <= 65) { tempoTextString = "Larghetto" };
    if (bpm >= 66 && bpm <= 75) { tempoTextString = "Adagio" };
    if (bpm >= 76 && bpm <= 107) { tempoTextString = "Andante" };
    if (bpm >= 108 && bpm <= 119) { tempoTextString = "Moderato" };
    if (bpm >= 120 && bpm <= 167) { tempoTextString = "Allegro" };
    if (bpm >= 168 && bpm <= 208) { tempoTextString = "Presto" };
    
    tempoText.textContent = tempoTextString;
}

function playClick() {
    if (count === beatsPerMeasure) {
        count = 0;
    }
    if (count === 0) {
    click1.play();
    } else {
        click2.play();
        click2.currentTime = 0;
    }
    count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });

