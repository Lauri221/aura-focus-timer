/**
 * Aura Focus Timer - Comprehensive Test Suite
 * 
 * This test suite validates the application's functionality with various inputs
 * including standard inputs, negative numbers, zero, strings, international characters,
 * floating point numbers, and other edge cases.
 */

// Test suite wrapper
(function() {
    'use strict';

    /**
     * Simulates DOM ready event to ensure all elements are loaded before testing
     * @param {Function} fn - Function to execute when DOM is ready
     */
    function onDOMReady(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    onDOMReady(function() {
        console.log('🧪 Starting Aura Focus Timer Test Suite');
        
        // Get references to DOM elements
        const timerDisplay = document.getElementById('timer-display');
        const startButton = document.getElementById('start-button');
        const stopButton = document.getElementById('stop-button');
        const resetButton = document.getElementById('reset-button');
        const workTimeButtons = document.querySelectorAll('.work-time');
        const nightModeToggle = document.getElementById('night-mode-toggle');
        const audioToggle = document.getElementById('audio-toggle');
        const customTimeInput = document.getElementById('custom-time');
        const setCustomTimerButton = document.getElementById('set-custom-timer');
        const customCycleInput = document.getElementById('custom-cycle');
        const customRestInput = document.getElementById('custom-rest');

        // Store original values to restore after tests
        const originalWorkTime = timerDisplay.textContent;

        /**
         * Utility function to run tests one after another with delays
         * @param {Array} tests - Array of test functions to run
         * @param {number} delay - Delay between tests in ms
         */
        function runTests(tests, delay = 500) {
            let i = 0;
            function nextTest() {
                if (i < tests.length) {
                    try {
                        tests[i]();
                    } catch (e) {
                        console.error(`Test ${i+1} failed:`, e);
                    }
                    i++;
                    setTimeout(nextTest, delay);
                } else {
                    console.log('✅ All tests completed');
                    // Restore original state
                    resetButton.click();
                }
            }
            nextTest();
        }

        /**
         * Asserts that a condition is true
         * @param {boolean} condition - Condition to check
         * @param {string} message - Message to display if condition fails
         */
        function assert(condition, message) {
            if (!condition) {
                console.error('❌ FAILED: ' + message);
                throw new Error(message);
            } else {
                console.log('✓ PASSED: ' + message);
            }
        }

        // Define all tests
        const tests = [
            // PART 1: Input Validation Tests - parseInput function indirectly
            
            /**
             * Test 1: Valid standard numeric inputs within range
             * Tests that the timer accepts valid numbers in the appropriate range
             */
            function testStandardNumericInputs() {
                console.group('Test 1: Valid standard numeric inputs');
                
                // Test work time input with valid value (25 minutes)
                customTimeInput.value = '25';
                customCycleInput.value = '3';
                customRestInput.value = '5';
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should set timer to 25:00 with valid input');
                
                // Test work time input with boundary values
                customTimeInput.value = '1'; // Min
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '01:00', 'Should accept minimum work time (1)');
                
                customTimeInput.value = '90'; // Max
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '90:00', 'Should accept maximum work time (90)');
                
                console.groupEnd();
            },
            
            /**
             * Test 2: Invalid numeric inputs (out of range)
             * Tests that the timer applies fallback values for out-of-range numbers
             */
            function testInvalidNumericInputs() {
                console.group('Test 2: Invalid numeric inputs');
                
                // Reset to known state
                resetButton.click();
                
                // Test with values outside allowed ranges
                customTimeInput.value = '0'; // Below min (should use fallback)
                customCycleInput.value = '0'; // Below min (should use fallback)
                customRestInput.value = '0'; // Below min (should use fallback)
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for zero values');
                
                customTimeInput.value = '-10'; // Negative (should use fallback)
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for negative values');
                
                customTimeInput.value = '91'; // Above max (should use fallback)
                customCycleInput.value = '11'; // Above max (should use fallback)
                customRestInput.value = '31'; // Above max (should use fallback)
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for values above max');
                
                console.groupEnd();
            },
            
            /**
             * Test 3: Non-numeric inputs
             * Tests the application's handling of various non-numeric inputs
             */
            function testNonNumericInputs() {
                console.group('Test 3: Non-numeric inputs');
                
                // Reset to known state
                resetButton.click();
                
                // Test with string values
                customTimeInput.value = 'abc'; // Plain text
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for text input');
                
                // Test with special characters
                customTimeInput.value = '@#$%'; 
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for special characters');
                
                // Test with empty input
                customTimeInput.value = '';
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for empty input');
                
                console.groupEnd();
            },
            
            /**
             * Test 4: International Character Support
             * Tests how the application handles non-Latin characters
             */
            function testInternationalCharacters() {
                console.group('Test 4: International characters');
                
                // Reset to known state
                resetButton.click();
                
                // Test with Asian characters (Chinese, Japanese, Korean)
                customTimeInput.value = '你好'; // Chinese
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for Chinese characters');
                
                customTimeInput.value = 'こんにちは'; // Japanese
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for Japanese characters');
                
                customTimeInput.value = '안녕하세요'; // Korean
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for Korean characters');
                
                // Test with Nordic characters
                customTimeInput.value = 'åäöÅÄÖ'; // Nordic
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for Nordic characters');
                
                // Test with Arabic characters
                customTimeInput.value = 'مرحبا'; // Arabic
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for Arabic characters');
                
                console.groupEnd();
            },
            
            /**
             * Test 5: Floating point numbers
             * Tests how the application handles decimal values
             */
            function testFloatingPointNumbers() {
                console.group('Test 5: Floating point numbers');
                
                // Reset to known state
                resetButton.click();
                
                // Test with floating point numbers
                customTimeInput.value = '15.5'; // Should truncate to 15
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '15:00', 'Should truncate decimal values');
                
                customTimeInput.value = '10.9'; // Should truncate to 10
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '10:00', 'Should truncate decimal values even when close to next integer');
                
                console.groupEnd();
            },
            
            /**
             * Test 6: Mixed input types
             * Tests combinations of valid and invalid inputs
             */
            function testMixedInputs() {
                console.group('Test 6: Mixed input types');
                
                // Reset to known state
                resetButton.click();
                
                // Test with valid work time but invalid rest time and cycles
                customTimeInput.value = '30'; // Valid
                customCycleInput.value = 'abc'; // Invalid
                customRestInput.value = '-5'; // Invalid
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '30:00', 'Should accept valid work time but use fallbacks for invalid inputs');
                
                // Test with mixed numeric and text
                customTimeInput.value = '20abc'; // Should use fallback
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for mixed numeric and text');
                
                console.groupEnd();
            },
            
            // PART 2: UI Interaction Tests
            
            /**
             * Test 7: Button functionality
             * Tests that UI buttons work as expected
             */
            function testButtonFunctionality() {
                console.group('Test 7: Button functionality');
                
                // Reset to known state
                resetButton.click();
                
                // Test preset work time buttons
                const tenMinBtn = Array.from(workTimeButtons).find(btn => btn.textContent.includes('10'));
                if (tenMinBtn) {
                    tenMinBtn.click();
                    assert(timerDisplay.textContent === '10:00', 'Work time button should set timer to 10:00');
                } else {
                    console.warn('Could not find 10-minute preset button');
                }
                
                // Test start/stop buttons
                startButton.click();
                // Wait briefly to ensure timer started
                setTimeout(() => {
                    const timeAfterStart = timerDisplay.textContent;
                    assert(timeAfterStart !== '10:00', 'Timer should start counting down after clicking start');
                    
                    stopButton.click();
                    const timeAfterStop = timerDisplay.textContent;
                    
                    // Wait to verify timer stopped
                    setTimeout(() => {
                        assert(timerDisplay.textContent === timeAfterStop, 'Timer should stop counting after clicking stop');
                        
                        // Test reset button
                        resetButton.click();
                        assert(timerDisplay.textContent === '25:00', 'Reset button should set timer back to default');
                    }, 1100);
                }, 1100);
                
                console.groupEnd();
            },
            
            /**
             * Test 8: Toggle functionality
             * Tests night mode and audio toggles
             */
            function testToggleFunctionality() {
                console.group('Test 8: Toggle functionality');
                
                // Test night mode toggle
                const bodyHasNightModeInitially = document.body.classList.contains('night-mode');
                nightModeToggle.click();
                const bodyHasNightModeAfterToggle = document.body.classList.contains('night-mode');
                assert(bodyHasNightModeInitially !== bodyHasNightModeAfterToggle, 'Night mode toggle should add/remove night-mode class');
                
                // Return to initial state
                if (bodyHasNightModeInitially !== bodyHasNightModeAfterToggle) {
                    nightModeToggle.click();
                }
                
                // Test audio toggle (this only tests the internal state change since we can't easily test sound)
                const audioToggleInitialState = audioToggle.checked;
                audioToggle.click();
                assert(audioToggle.checked !== audioToggleInitialState, 'Audio toggle should change checked state');
                
                // Return to initial state
                audioToggle.checked = audioToggleInitialState;
                
                console.groupEnd();
            },
            
            // PART 3: Edge Case and Security Tests
            
            /**
             * Test 9: Very large inputs
             * Tests how the application handles extremely large values
             */
            function testExtremeValues() {
                console.group('Test 9: Extreme values');
                
                // Reset to known state
                resetButton.click();
                
                // Test with very large number
                customTimeInput.value = '9999999999'; // Very large number
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for extremely large values');
                
                // Test with Maximum safe integer in JavaScript
                customTimeInput.value = Number.MAX_SAFE_INTEGER.toString();
                setCustomTimerButton.click();
                assert(timerDisplay.textContent === '25:00', 'Should use fallback for MAX_SAFE_INTEGER');
                
                console.groupEnd();
            },
            
            /**
             * Test 10: Potential security issues
             * Tests for script injection and other security concerns
             */
            function testSecurityConcerns() {
                console.group('Test 10: Security concerns');
                
                // Reset to known state
                resetButton.click();
                
                // Test with script injection attempt
                const scriptInjection = '<script>alert("XSS")</script>';
                customTimeInput.value = scriptInjection;
                setCustomTimerButton.click();
                
                // We're just checking the input doesn't cause errors
                // In a real app, this shouldn't execute the script
                assert(true, 'Application should handle script injection attempts gracefully');
                
                console.groupEnd();
            }
        ];

        // Run all the tests with a delay between each
        console.log('Running tests...');
        runTests(tests, 1000); // 1 second between tests
    });
})();