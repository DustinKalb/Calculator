// Select the display element
const display = document.getElementById('display');

// Variables to store the current input, previous input, and operator
let currentInput = '';
let previousInput = '';
let operator = null;

// Function to update the display
function updateDisplay() {
    display.textContent = currentInput || '0';
}

// Function to handle number button clicks
function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

// Function to handle operator button clicks
function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Function to perform the calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Error' : prev / current; // Handle division by zero
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

// Function to clear the calculator
function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

// Add event listeners to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value)) {
            appendNumber(value);
        } else if (['+', '-', '*', '/'].includes(value)) {
            chooseOperator(value);
        } else if (value === '=') {
            calculate();
        } else if (value === 'C') {
            clearCalculator();
        }
    });
});

// Initialize the display
updateDisplay();