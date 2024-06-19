// calculation functions
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function percent(a) {
    return a * 0.01;
};

// array and variables to store user selection
let inputArray = [];
let firstNumber = null;
let secondNumber = null;
let operator = null;
let storeResult = null;

// function to combine input with calc function
function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
            break;
        case '-':
            return subtract(firstNumber, secondNumber);
            break;
        case '*':
            return multiply(firstNumber, secondNumber);
            break;
        case '/':
            return divide(firstNumber, secondNumber);
            break;
        case '%':
            return percent(firstNumber);
            break;
    }
}

// populate the display
function updateDisplay(input) {
    const display = document.querySelector('.display');
    
    // stitch together array values
    display.textContent = input.join('');
}

// event handler for key click
function selectKey() {
    const keys = document.querySelector('.calc-container');
    keys.addEventListener('click', (e) => {
        if (e.target.classList.contains('key')) {
        const keyChoice = e.target.textContent;

            if (keyChoice === 'AC') {
                clearCalc();
                return;
            }

            if (keyChoice === 'DEL') {
                inputArray.pop();
                updateDisplay(inputArray);
                return;
            }

            if (!isNaN(keyChoice) || keyChoice === '.') {
                inputArray.push(keyChoice);
                updateDisplay(inputArray);
            }
            
            if (['+', '-', '*', '/', '%'].includes(keyChoice)) {
                if (operator === null) {
                    // assign firstNumber and operator
                    inputArray.push(keyChoice);
                    cleanInput();
                    updateDisplay(inputArray);
                } else {
                    if (keyChoice === '%') {
                        //cleanInput();
                        calcResult();
                    } else {
                        // assign secondNumber
                        cleanInput();
                        calcResult();
                        inputArray.push(keyChoice);
                        updateDisplay(inputArray);
                        //cleanInput();
                    }
                }
            }
            
            if (keyChoice === '=') {
                // assign secondNumber
                cleanInput();
                if (secondNumber === null || operator === null) {
                    clearCalc();
                } else {
                    calcResult();
                }
            }
        }
    });
}

// split inputArray into separate arrays before after operator, assigning operator
function cleanInput() {
    let firstNumberArray = [];
    let secondNumberArray = [];
    // set to -1 so it holds a value not run in the loop
    let operatorIndex = -1;

    // find the first occurrence of an operator
    for (let i = 0; i < inputArray.length; i++) {
        if (['+', '-', '*', '/', '%'].includes(inputArray[i])) {
            operatorIndex = i;
            // assigning top operator variable here
            operator = inputArray[i];
            break;
        }
    }
        if (operatorIndex != -1) {
            // default to 0 as first term when using operator keys without adding values first
            if (operatorIndex == 0) {
                inputArray.unshift('0');
            }
            // slice the inputArray to get first number array
            firstNumberArray = inputArray.slice(0, operatorIndex);
            // assigning top operator variable here
            firstNumber = parseFloat(firstNumberArray.join(''));

            secondNumberArray = inputArray.slice(operatorIndex + 1);
            console.log(secondNumberArray);
            if (secondNumberArray.includes('%')) {
                secondNumberArray.pop();
                secondNumber = parseFloat(secondNumberArray.join('')) * 0.01;
            } else {
            secondNumber = parseFloat(secondNumberArray.join(''));
            console.log(secondNumber);
            }
        }
}

// calculate and display result
function calcResult() {
    let result = operate(operator, firstNumber, secondNumber);
    storeResult = result;
    updateDisplay([result]);

    inputArray = [result];
    firstNumber = null;
    secondNumber = null;
    operator = null;
}

// clear display, variables, and arrays
function clearCalc() {
    inputArray = [];
    firstNumber = null;
    secondNumber = null;
    operator = null;
    storeResult = null;
    updateDisplay([0]);
} 


/////////////// generate calculator app
function runApp() {
selectKey();
}

runApp();