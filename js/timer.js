// filepath: /aura-focus-timer/aura-focus-timer/js/timer.js

let timer;
let isRunning = false;
let timeLeft = 0;
let workDuration = 25 * 60; // Default work duration in seconds
let restDuration = 5 * 60; // Default rest duration in seconds
let isWorkTime = true;

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

function startTimer(duration) {
    timeLeft = duration;
    isRunning = true;
    updateDisplay();

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            playAlarm();
            shakeScreen();
            toggleTimer();
        } else {
            timeLeft--;
            updateDisplay();
        }
    }, 1000);
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    timeLeft = isWorkTime ? workDuration : restDuration;
    updateDisplay();
}

function toggleTimer() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workDuration : restDuration;
    updateDisplay();
}

function playAlarm() {
    const audio = new Audio('assets/sounds/alarm.mp3');
    audio.play();
}

function shakeScreen() {
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 500);
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        startTimer(isWorkTime ? workDuration : restDuration);
    }
});

stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);