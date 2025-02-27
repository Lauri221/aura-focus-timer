// filepath: /aura-focus-timer/aura-focus-timer/js/settings.js

const settings = {
    workTime: 25, // default work time in minutes
    restTime: 5, // default rest time in minutes
    customWorkTime: null,
    customRestTime: null,
    cycles: 4, // default number of cycles
};

function saveSettings() {
    localStorage.setItem('auraFocusSettings', JSON.stringify(settings));
}

function loadSettings() {
    const savedSettings = localStorage.getItem('auraFocusSettings');
    if (savedSettings) {
        Object.assign(settings, JSON.parse(savedSettings));
    }
}

function setCustomWorkTime(minutes) {
    if (minutes > 0) {
        settings.customWorkTime = minutes;
        saveSettings();
    }
}

function setCustomRestTime(minutes) {
    if (minutes > 0) {
        settings.customRestTime = minutes;
        saveSettings();
    }
}

function setCycles(num) {
    if (num > 0) {
        settings.cycles = num;
        saveSettings();
    }
}

loadSettings();