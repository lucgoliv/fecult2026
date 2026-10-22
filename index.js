const volume = document.getElementById("volume");
Audio.prototype.playing = false;

const total = 7;
const sounds = Array.from({ length: total }, (_, i) => new Audio(`sounds/${i + 1}.wav`));
const btns = Array.from({ length: total }, (_, i) => document.getElementById(`${i + 1}`));
let currentlyPlaying = null;
const stop = () => {
    console.log("stop called");
    if (currentlyPlaying !== null) {
        sounds[currentlyPlaying].pause();
        sounds[currentlyPlaying].playing = false;
        sounds[currentlyPlaying].currentTime = 0;
        btns[currentlyPlaying].classList.replace("pause", "play");
        btns[currentlyPlaying].classList.remove("current");
    };
    currentlyPlaying = null;
};
const toggle = (i) => {
    console.log(`${i + 1} toggle called`)
    if (currentlyPlaying === null || sounds[i].playing === false) {
        console.log(`${i + 1} paused, playing`)
        if (currentlyPlaying !== i) {
            stop();
            currentlyPlaying = i;
        };
        volume.value = 1000;
        sounds[i].volume = 1;
        sounds[i].play();
        sounds[i].playing = true;
        btns[i].classList.replace("play", "pause");
        btns[i].classList.add("current");
    } else if (currentlyPlaying === i && sounds[i].playing === true) {
        console.log(`${i + 1} playing, pausing`)
        sounds[i].pause();
        sounds[i].playing = false;
        btns[i].classList.replace("pause", "play");
    } else console.log("???"); // sos
};

document.addEventListener("keypress", (e) => {
    if (e.key === " ") stop();
});
document.getElementById("stop").addEventListener("click", stop);
for (let i = 0; i < total; i++) {
    btns[i].addEventListener("click", () => {
        console.log(`toggled ${i + 1} by button`);
        toggle(i);
    });
    sounds[i].addEventListener("ended", () => {
        console.log(`sound ${i + 1} ended`);
        stop();
    });
    document.addEventListener("keypress", (e) => {
        if (e.key === `${i + 1}`) {
            console.log(`toggled ${i + 1} by key press`);
            toggle(i);
        };
    });
};
volume.addEventListener("input", () => {
    const value = volume.value / 1000;
    console.log(currentlyPlaying, value)
    if (currentlyPlaying != null) sounds[currentlyPlaying].volume = value;
});