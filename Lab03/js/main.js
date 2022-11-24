document.addEventListener('keypress', onKeyPress)

const soundMap = {};

// const BPM = 60;
const isRecording = false;
const channelCount = 4;
const recordingMillisecond = 0;

let instrument = new URLSearchParams(window.location.search).get('instrument');
fetch(`sounds/${instrument}.json`)
    .then((response) => response.json())
    .then((json) => {
        Object.entries(json).forEach(([key, value]) => {

            let audio = document.createElement('audio');
            soundMap[key] = audio;

            audio.setAttribute('id', `sound_${value}`);
            audio.setAttribute('src', `sounds/${instrument}/${value}`);

            document.head.appendChild(audio)
        });
    });

sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
playSound = (sound) => { sound.currentTime = 0; sound.play() }

Object.entries(soundMap).forEach(([key, value]) => {
    
})

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// function playSound(sound) {
//     sound.currentTime = 0;
//     sound.play();
// }

function onKeyPress(event) {
    if (event.key in soundMap) {
        playSound(soundMap[event.key]);
        if (isRecording) {
            
        }
    }
}

// function recordSound() {
//     msCounter = 0;
//     while (msCounter < 1000*60 || ) {
//         sleep(1)
//     }
// }