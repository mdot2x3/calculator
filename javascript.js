// calculation functions
function add(a, b){
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    return a / b;
};

// array and variables to store user selection
let inputArray = [];
let firstNumber;
let secondNumber;
let operator;
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
    }
}

// create calculator input buttons within grid
let makeArray = [];
function makeKey() {
    let idTag = 0;
    let keySymbol = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '0', 'clear', '=', '/'];

    for (let i = 0; i < keySymbol.length; i++) {
        const keyButton = document.createElement('div');
        keyButton.classList.add('key');
        idTag += 1;
        keyButton.setAttribute('id', idTag);

        // assign key symbols from array
        keyButton.textContent = keySymbol[i];

        makeArray.push(keyButton);
    }
}

// print calculator input buttons within grid
function printKey() {
    for (let i = 0; i < makeArray.length; i++) {
        const keySet = document.querySelector('.calc-container');
        keySet.appendChild(makeArray[i]);
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

        if (['+', '-', '*', '/'].includes(keyChoice) && operator !== undefined) {
            return;
        }

        if (keyChoice === 'clear') {
            clearCalc();
            return;
        }

        if (!isNaN(keyChoice) || keyChoice === '.') {
            inputArray.push(keyChoice);
            updateDisplay(inputArray);
        } else if (['+', '-', '*', '/'].includes(keyChoice)) {
            cleanInput();  // Ensure cleanInput is called to assign firstNumber and operator
            operator = keyChoice;
            inputArray.push(keyChoice);
            updateDisplay(inputArray);
        } else if (keyChoice === '=') {
            cleanInput();  // Ensure cleanInput is called to assign secondNumber
            calcResult(keyChoice);
        }
        
        // // collect key input into an array
        // inputArray.push(keyChoice);

        // // run function with array input to display
        // updateDisplay(inputArray);
        // cleanInput();
        // calcResult(keyChoice);
        // clearCalc(keyChoice);
        }
    });
}

// split inputArray into separate arrays before after operator, assigning operator
function cleanInput() {
    let firstNumberArray = [];
    let secondNumberArray = [];
    // set to -1 so it holds a value not run in the loop
    let operatorIndex = -1;

    // Find the first occurrence of an operator
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] === '+' || 
            inputArray[i] === '-' ||
            inputArray[i] === '*' ||
            inputArray[i] === '/') 
        {
            operatorIndex = i;
            
            // assigning top operator variable here
            operator = inputArray[i];

            break;
        }
    }
        if (operatorIndex != -1) {
            // Slice the inputArray to get first number array
            firstNumberArray = inputArray.slice(0, operatorIndex);
            // assigning top operator variable here
            firstNumber = parseFloat(firstNumberArray.join(''));

            // Slice the inputArray to get first number array
            secondNumberArray = inputArray.slice(operatorIndex + 1);
            // assigning top operator variable here
            secondNumber = parseFloat(secondNumberArray.join(''));
        }
}

// calculate and display result
function calcResult(keyChoice) {
    if (keyChoice === '=') {
        if (firstNumber !== undefined && 
            secondNumber !== undefined && 
            operator !== undefined)
        {
            let result = operate(operator, firstNumber, secondNumber);
            storeResult = result;
            updateDisplay([result]);

            // Reset inputArray to start fresh with the result
            inputArray = [result.toString()];
            firstNumber = result;
            secondNumber = undefined;
            operator = undefined;

        } else {
            clearCalc();
        }
    }
}

// clear display, variables, and arrays
function clearCalc() {
            firstNumber = undefined;
            secondNumber = undefined;
            operator = undefined;
            inputArray = [];
            storeResult = null;
            updateDisplay([0]);
} 



/////////////
// generate calculator app
function runApp() {
makeKey();
printKey();
selectKey();
}

runApp();