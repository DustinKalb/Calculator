const display = document.getElementById('display');

let currentInput = '';
let previousInput = '';
let operator = null;

// Updates the display
function updateDisplay() {
    display.textContent = currentInput || '0';
}

// Appends input to current number
function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

// Handles the operator and prepares for next input
function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Calculation
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

// Clears the calculator
function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

// Handles event listeners
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

updateDisplay();