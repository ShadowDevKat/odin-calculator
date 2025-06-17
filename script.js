//Object Constructors
function Calculator() {
    this.add = function (a, b) {
        return a + b;
    };
    this.subtract = function (a, b) {
        return a - b;
    };
    this.multiply = function (a, b) {
        return a * b;
    };
    this.divide = function (a, b) {
        return a / b;
    };
    this.operate = function (a, b, op) {
        a = Number(a);
        b = Number(b);
        let result = '';
        switch (op) {
            case '+':
                result = this.add(a, b);
                break;
            case '-':
                result = this.subtract(a, b);
                break;
            case '*':
                result = this.multiply(a, b);
                break;
            case '/':
                result = this.divide(a, b);
                break;
            default:
                break;
        }
        return Math.round(result * 100) / 100;
    };
}
function Operand() {
    this.value = '';
    this.updateValue = function (inputVal) {
        if (inputVal === '.' && !this.isEmpty() && !this.hasDecimal()) {
            this.value += inputVal;
        } else if (this.value.length === 1 && this.value === '0') {
            this.value = inputVal;
        } else {
            this.value += inputVal;
        }
    }
    this.deleteLastDigit = function () {
        if (this.value.length >= 2) {
            this.value = this.value.substring(0, this.value.length - 1);
        }
    }
    this.isEmpty = function () {
        return this.value.length === 0;
    }
    this.hasDecimal = function () {
        return this.value.indexOf('.') === -1 ? false : true;
    }
    this.hasValueAfterDecimal = function () {
        if (this.hasDecimal()) {
            return this.value.indexOf('.') === this.value.length - 1 ? false : true;
        }
    }
    this.clear = function () {
        this.value = '';
    }
}
function Operator() {
    this.value = '';
    this.isEmpty = function () {
        return this.value.length === 0;
    }
    this.clear = function () {
        this.value = '';
    }
}

//Display Methods
const previousDisplay = document.querySelector('.previous-display');
const currentDisplay = document.querySelector('.current-display');

function setPreviousDisplay(str) {
    previousDisplay.textContent = str;
}
function setCurrentDisplay(str) {
    currentDisplay.textContent = str;
}
function updateDisplay() {
    if (operator.value === '') {
        setPreviousDisplay(``);
        setCurrentDisplay(`${operandOne.value}`);
    }
    else if (result.length === 0) {
        setPreviousDisplay(`${operandOne.value} ${operator.value}`);
        setCurrentDisplay(`${operandTwo.value}`);
    }
    else {
        setPreviousDisplay(``);
        setCurrentDisplay(`${result}`);
    }
}

//Variables
const myCalculator = new Calculator();
const operandOne = new Operand();
const operandTwo = new Operand();
const operator = new Operator();
let lastResult = '';
let result = '';

function reset() {
    operandOne.value = '0';
    operator.value = '';
    operandTwo.value = '';
    result = '';
}
function resetAndDisplay() {
    lastResult = '';
    reset();
    updateDisplay();
}
reset();

//Event handling
const buttonParent = document.querySelector('.button-area');

const numericButtons = {
    num0Btn: '0',
    num1Btn: '1',
    num2Btn: '2',
    num3Btn: '3',
    num4Btn: '4',
    num5Btn: '5',
    num6Btn: '6',
    num7Btn: '7',
    num8Btn: '8',
    num9Btn: '9',
    decimalBtn: ".",
}

const operatorButtons = {
    addBtn: '+',
    subtractBtn: '-',
    multiplyBtn: '*',
    divideBtn: '/',
}

const methodButtons = {
    clearBtn: resetAndDisplay,
    resultBtn: computeResult,
    deleteBtn: handleDelete,
    // emptyBtn: "",
}

buttonParent.addEventListener('click', (e) => {
    let btnId = e.target.id;

    if (btnId in numericButtons) {
        handleNumeric(numericButtons[btnId]);
    }
    else if (btnId in operatorButtons) {
        handleOperator(operatorButtons[btnId]);
    }
    else if (btnId in methodButtons) {
        methodButtons[btnId]();
    }
});

//Common
function canCalculate() {
    return !operandOne.isEmpty() && !operator.isEmpty() && !operandTwo.isEmpty();
}
function getCurrentOperand() {
    let currentOperand = null;
    if (operator.isEmpty()) {
        currentOperand = operandOne;
    } else if (!operator.isEmpty()) {
        currentOperand = operandTwo;
    }
    return currentOperand;
}
function canUseOperand() {
    let currentOperand = getCurrentOperand();
    if (currentOperand) {
        if (!currentOperand.hasDecimal()) {
            return true;
        }
        else if (currentOperand.hasValueAfterDecimal()) {
            return true;
        } else {
            return false;
        }
    }
}

//Input handlers
function handleNumeric(inputVal) {
    const currOperand = getCurrentOperand();
    if (currOperand) {
        if (currOperand.hasDecimal() && inputVal === '.') {
            return;
        }
        currOperand.updateValue(inputVal);
    }
    updateDisplay();
}
function handleOperator(op) {
    if (!canUseOperand()) {
        return;
    }

    if (operandOne.value === '0' && operator.isEmpty && lastResult !== '') {
        operandOne.updateValue(lastResult);
        operator.value = op;
    } else if (!operandOne.isEmpty() && operator.isEmpty()) {
        operator.value = op;
    } else if (canCalculate()) {
        computeResult();
        operandOne.updateValue(lastResult);
        operator.value = op;
    }
    updateDisplay();
}
function computeResult() {
    if (!canUseOperand()) {
        return;
    }
    if (canCalculate()) {
        result = myCalculator.operate(operandOne.value, operandTwo.value, operator.value);
        lastResult = result;
        updateDisplay();
        reset();
    }
}
function handleDelete() {
    const currOperand = getCurrentOperand();
    if (currOperand) {
        currOperand.deleteLastDigit();
    }
    updateDisplay();
}