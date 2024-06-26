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
                // if operator unassigned proceed as usual
                if (operator === null) {
                    // prevent blank display when deleting all numbers
                    if (inputArray.length > 1) {
                        inputArray.pop();
                        updateDisplay(inputArray);
                    } else if (inputArray.length <= 1) {
                        clearCalc();
                    }
                    return;
                    // else allow deleted operators to be reassigned
                } else {
                    operator = null;
                    // prevent blank display when deleting all numbers
                    if (inputArray.length > 1) {
                        inputArray.pop();
                        updateDisplay(inputArray);
                    } else if (inputArray.length <= 1) {
                        clearCalc();
                    }
                    return;
                }
            }

            if (keyChoice === '+/-') {
                // prevent blank display when hitting key on startup or after pressing AC
                if (inputArray.length === 0) {
                    return;
                }
                cleanInput();
                // assign front end '-'
                if (operator === null) {
                    if (!isNaN(inputArray[0]) || inputArray[0] === '.') {
                        // check for positive value and insert '-'
                        if (inputArray[0] > 0 || inputArray[0] === '.') {
                            inputArray.unshift('-');
                        // else negative value (therefore already calculated as an integer)
                        } else {
                            inputArray[0] *= -1;
                        }
                    // for cases when initial value is not a number or a period, aka '-'
                    } else {
                        inputArray.shift();
                    }
                    updateDisplay(inputArray);
                // assign back end '-'
                } else {
                    if (operator === '+') {
                        // find index and replace operator value
                        let plus = inputArray.indexOf('+');
                        inputArray.splice(plus, 1, '-');
                    } else if (operator === '-'){
                        // need to find lastIndexOf here to avoid catching front side negatives
                        let minus = inputArray.lastIndexOf('-');
                        inputArray.splice(minus, 1, '+');
                    } else if (operator === '/') {
                        let divi = inputArray.indexOf('/');
                            // check if negative exists, if not, insert a '-' after the operator
                            if (inputArray[divi + 1] !== '-') {
                                inputArray.splice(divi + 1, 0, '-');
                            } else {
                                // else remove the '-' using lastIndexOf
                                let diviMinus = inputArray.lastIndexOf('-');
                                inputArray.splice(diviMinus, 1);
                            }
                    } else if (operator === '*') {
                        let multi = inputArray.indexOf('*');
                            if (inputArray[multi + 1] !== '-') {
                                inputArray.splice(multi + 1, 0, '-');
                            } else {
                                // else remove the '-' using lastIndexOf
                                let multiMinus = inputArray.lastIndexOf('-');
                                inputArray.splice(multiMinus, 1);
                            }
                    }
                    cleanInput();
                    updateDisplay(inputArray);
                }
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
                        inputArray.push(keyChoice);
                        cleanInput();
                        updateDisplay(inputArray);
                    } else {
                        // assign secondNumber
                        cleanInput();
                        calcResult();
                        inputArray.push(keyChoice);
                        updateDisplay(inputArray);
                        // sets result and operator to top variables, awaits next value to calc against
                        cleanInput();
                    }
                }
            }
            
            if (keyChoice === '=') {
                // assign secondNumber
                cleanInput();
                // nothing happens when = key clicked without other values set
                if (secondNumber === null || operator === null) {
                    return;
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
            // make sure operator in position one (+/-) isn't assigned as calculation operator
            if (operatorIndex == 0) {
                continue;
            } else {
                // assigning top operator variable here
                operator = inputArray[i];
                break;
            }
            
        }
    }
        if (operatorIndex != -1) {
            // default to 0 as first term when using operator keys without adding values first
            if (operatorIndex == 0 && inputArray.length == 1) {
                inputArray.unshift('0');
            }
            // slice the inputArray to get first number array
            firstNumberArray = inputArray.slice(0, operatorIndex);
            // assigning top operator variable here
            firstNumber = parseFloat(firstNumberArray.join(''));

            secondNumberArray = inputArray.slice(operatorIndex + 1);
            // check if second array contains % and if so, convert it first before assignment to secondNumber
            if (secondNumberArray.includes('%')) {
                secondNumberArray.pop();
                secondNumber = parseFloat(secondNumberArray.join('')) * 0.01;
            } else {
            secondNumber = parseFloat(secondNumberArray.join(''));
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