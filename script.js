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
        switch (op) {
            case '+':
                return this.add(a, b);
            case '-':
                return this.subtract(a, b);
            case '*':
                return this.multiply(a, b);
            case '/':
                return this.divide(a, b);
            default:
                break;
        }
    };
}
function Operand() {
    this.value = '';
    this.updateValue = function (digit) {
        if (this.value.length === 1 && this.value === '0') {
            this.value = digit;
        } else {
            this.value += digit;
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

//DOM Queries
const display = document.querySelector('.display-area');
const buttonParent = document.querySelector('.button-area');

//Event handling
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
}

const operatorButtons = {
    addBtn: '+',
    subtractBtn: '-',
    multiplyBtn: '*',
    divideBtn: '/',
}

const methodButtons = {
    // decimalBtn: ".",
    clearBtn: clearDisplay,
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

//Display Methods
function setDisplay(str) {
    display.textContent = str;
}
function clearDisplay() {
    display.textContent = 0;
    resetCalculation();
}
function updateDisplay() {
    if (result.length === 0) {
        setDisplay(`${operandOne.value} ${operator.value} ${operandTwo.value}`);
    } else {
        setDisplay(`${operandOne.value} ${operator.value} ${operandTwo.value} = ${result}`);
    }
}

//Variables
const myCalculator = new Calculator();
const operandOne = new Operand();
const operandTwo = new Operand();
const operator = new Operator();
let lastResult = '';
let result = '';

function init() {
    operandOne.updateValue(0);
    operator.value = '';
    operandTwo.value = '';
    lastResult = '';
    result = '';
}

init();

//Input handlers
function handleNumeric(digit) {
    if (operator.isEmpty()) {
        operandOne.updateValue(digit);
    }
    else {
        operandTwo.updateValue(digit);
    }
    updateDisplay();
}
function handleOperator(op) {
    if (!operandOne.isEmpty() && operator.isEmpty()) {
        operator.value = op;
    } else if (!operandOne.isEmpty() && !operator.isEmpty() && !operandTwo.isEmpty()) {
        computeResult();
        operandOne.updateValue(lastResult);
        operator.value = op;
    }
    updateDisplay();
}
function computeResult() {
    if (!operandOne.isEmpty() && !operator.isEmpty() && !operandTwo.isEmpty()) {
        result = myCalculator.operate(operandOne.value, operandTwo.value, operator.value);
        lastResult = result;
        updateDisplay();
        resetCalculation();
    }
}
function handleDelete() {
    //find current operand
    let currentOperand = null;
    if (!operandOne.isEmpty() && operator.isEmpty()) {
        currentOperand = operandOne;
    } else if (!operator.isEmpty()) {
        currentOperand = operandTwo;
    }

    if (currentOperand) {
        currentOperand.deleteLastDigit();
    }
    updateDisplay();
}
function resetCalculation() {
    operandOne.clear();
    operandTwo.clear();
    operator.clear();
    result = '';
}