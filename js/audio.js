const audio = {
    alarm: new Audio('assets/sounds/alarm.mp3'),
    tick: new Audio('assets/sounds/tick.mp3'),
    complete: new Audio('assets/sounds/complete.mp3'),

    playAlarm() {
        this.alarm.currentTime = 0; // Reset the audio to the start
        this.alarm.play();
    },

    playTick() {
        this.tick.currentTime = 0; // Reset the audio to the start
        this.tick.play();
    },

    playComplete() {
        this.complete.currentTime = 0; // Reset the audio to the start
        this.complete.play();
    },

    setVolume(volume) {
        this.alarm.volume = volume;
        this.tick.volume = volume;
        this.complete.volume = volume;
    }
};

export default audio;