document.addEventListener('DOMContentLoaded', () => {
    const DEFAULT_WORK = 25 * 60;
    const DEFAULT_REST = 5 * 60;
    const DEFAULT_CYCLES = 3;

    const timerDisplay = document.getElementById('timer-display');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const resetButton = document.getElementById('reset-button');
    const workTimeButtons = document.querySelectorAll('.work-time');
    const restTimeButtons = document.querySelectorAll('.rest-time');
    const nightModeToggle = document.getElementById('night-mode-toggle');
    const audioToggle = document.getElementById('audio-toggle');
    const customTimeInput = document.getElementById('custom-time');
    const setCustomTimerButton = document.getElementById('set-custom-timer');
    const customCycleInput = document.getElementById('custom-cycle');
    const customRestInput = document.getElementById('custom-rest');

    let timer, isRunning = false;
    let workTime = DEFAULT_WORK;
    let restTime = DEFAULT_REST;
    let isWorkSession = true;
    let audioEnabled = true;
    let totalCycles = DEFAULT_CYCLES;
    let currentCycle = 1;

    function updateDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function playSound(file) {
        if (audioEnabled) {
            new Audio(`./assets/sounds/${file}`).play();
        }
    }

    function triggerAlarm(file) {
        playSound(file);
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 500);
    }

    function timerTick() {
        if (isWorkSession) {
            workTime--;
            updateDisplay(workTime);
            if (workTime <= 0) {
                clearInterval(timer);
                isRunning = false;
                isWorkSession = false;
                triggerAlarm('alarm.mp3');
                adjustRestTime();
                startTimer();
            }
        } else {
            restTime--;
            updateDisplay(restTime);
            if (restTime <= 0) {
                clearInterval(timer);
                isRunning = false;
                triggerAlarm('alarm.mp3');
                if (currentCycle < totalCycles) {
                    currentCycle++;
                    isWorkSession = true;
                    resetWorkTime();
                    startTimer();
                } else {
                    updateDisplay(0);
                    triggerAlarm('end.mp3');
                }
            }
        }
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        timer = setInterval(timerTick, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        isRunning = false;
    }

    function resetWorkTime() {
        workTime = DEFAULT_WORK;
    }

    function adjustRestTime() {
        // Long break after every 3 cycles if using extended sessions.
        if (totalCycles >= 5 && (currentCycle % 3 === 0)) {
            restTime = 20 * 60;
        }
    }

    function resetTimer() {
        stopTimer();
        workTime = DEFAULT_WORK;
        restTime = DEFAULT_REST;
        totalCycles = DEFAULT_CYCLES;
        currentCycle = 1;
        isWorkSession = true;
        updateDisplay(workTime);
    }

    function parseInput(element, min, max, fallback) {
        const value = parseInt(element.value, 10);
        return (!isNaN(value) && value >= min && value <= max) ? value : fallback;
    }

    // Event Listeners
    workTimeButtons.forEach(button => {
        button.addEventListener('click', () => {
            workTime = parseInt(button.dataset.time, 10) * 60;
            totalCycles = DEFAULT_CYCLES;
            currentCycle = 1;
            isWorkSession = true;
            updateDisplay(workTime);
        });
    });

    restTimeButtons.forEach(button => {
        button.addEventListener('click', () => {
            restTime = parseInt(button.dataset.time, 10) * 60;
            updateDisplay(restTime);
        });
    });

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);

    nightModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('night-mode');
    });

    audioToggle.addEventListener('change', () => {
        audioEnabled = audioToggle.checked;
    });

    setCustomTimerButton.addEventListener('click', () => {
        const customMinutes = parseInput(customTimeInput, 1, 90, DEFAULT_WORK / 60);
        const customCycles = parseInput(customCycleInput, 1, 10, DEFAULT_CYCLES);
        const customRest = parseInput(customRestInput, 1, 30, DEFAULT_REST / 60);

        workTime = customMinutes * 60;
        restTime = customRest * 60;
        totalCycles = customCycles;
        currentCycle = 1;
        isWorkSession = true;
        updateDisplay(workTime);
    });

    updateDisplay(workTime);
});

// Initialize Bootstrap tooltips
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: 'hover'
        });
    });
});
