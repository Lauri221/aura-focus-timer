# Aura Focus Timer

A sleek, modern Pomodoro timer application designed to boost productivity through focused work sessions and scheduled breaks.

## Features

- **Preset Timers**: Quick access to 10, 15, and 20-minute focus sessions
- **Custom Timer Settings**:
  - Work duration (1-90 minutes)
  - Rest duration (1-30 minutes)
  - Number of cycles (1-10)
- **Automatic Break System**: 
  - Short breaks between work sessions
  - Extended 20-minute breaks after every 3 cycles when setting 5+ cycles
- **Visual & Audio Notifications**:
  - Screen shake effect when timers end
  - Audio alarms with toggle option
  - Different sounds for session changes vs. completion
- **Night Mode**: Toggle between light and dark themes for comfortable viewing
- **Responsive Design**: Works seamlessly across devices of all sizes
- **Informative Tooltips**: Hover over elements to get helpful guidance

## How It Works

1. **Choose Your Timer**:
   - Select a preset work timer (10, 15, or 20 minutes)
   - Or customize your own work time, rest time, and number of cycles

2. **Start & Control**:
   - Use the Start button to begin your focus session
   - Pause anytime with the Pause button
   - Reset to default settings with the Reset button

3. **Automatic Progression**:
   - Timer automatically switches between work and rest periods
   - Visual and audio cues signal transitions
   - After completing all cycles, a special completion sound plays

## Technical Implementation

- Built with vanilla JavaScript, HTML5, and CSS3
- Utilizes Bootstrap 5 for responsive design
- Font Awesome icons for intuitive UI elements
- Custom CSS animations for visual feedback
- Audio API for sound notifications
- Local session management with no external dependencies

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aura-focus-timer.git
   ```

2. Navigate to the project directory:

```bash
cd aura-focus-timer
```

3. Open index.html in your browser, or serve it using a local development server.

## Project Structure

aura-focus-timer/
├── css/
│   ├── style.css          # Main styling
│   └── night-mode.css     # Dark theme styling
├── js/
│   ├── app.js             # Application logic
│   └── aura-timer-tests.js# Comprehensive test suite
├── assets/
│   └── sounds/
│       ├── alarm.mp3      # Session transition sound
│       └── end.mp3        # Completion sound
└── index.html             # Main HTML document

## Testing
A comprehensive test suite has been provided to verify various aspects of the application including:

- *Input Validation* (standard numeric, negative numbers, zero, non-numeric strings, international characters, and floating point numbers)
- *UI Interactions* (button operations, preset timer actions, toggles for night mode and audio)
- *Edge Cases & Security* (extremely large numbers and potential script injection attempts)

## How to Run the Tests
1. Ensure you have the test file <aura-timer-tests.js> located in your <js> folder.
2. Include the test file in your <index.html> after your app’s main script. For example, add the following lines before the closing </body> tag:

```markdown
<script src="js/app.js"></script>
<script src="js/aura-timer-tests.js"></script>
```

Simply commit this updated README file in your repository so that users know about the test suite and how to run the tests.

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Bootstrap Framework
- Font Awesome Icons
- Google Fonts
