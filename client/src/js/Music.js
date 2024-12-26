document.addEventListener('DOMContentLoaded', function () {
function handleAudioPlay(audio) {
const audioElements = document.getElementsByTagName('audio');
for (let i = 0; i < audioElements.length; i++) {
if (audioElements[i] !== audio) {
audioElements[i].pause();
}
}
}

const audioElements = document.querySelectorAll('audio');
audioElements.forEach(function (audio) {
audio.addEventListener('play', function () {
handleAudioPlay(audio);
});
});
});


window.addEventListener('DOMContentLoaded', function () {
const loadingScreen = document.querySelector('.loading-screen');

// Simulate a delay before hiding the loading screen
setTimeout(function () {
loadingScreen.classList.add('loaded');
}, 2000); // Adjust the delay time (in milliseconds) as needed
});