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

// variables to store user selection
let firstNumber
let secondNumber
let operator

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
let array = [];
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

        array.push(keyButton);
    }
}

// print calculator input buttons within grid
function printKey() {
    for (let i = 0; i < array.length; i++) {
        const keySet = document.querySelector('.calc-container');
        keySet.appendChild(array[i]);
    }
}

// populate the display
function updateDisplay(input) {
    const display = document.querySelector('.display');
    display.textContent = input;
}


// generate calculator app
function runApp() {
makeKey();
printKey();
}

runApp();