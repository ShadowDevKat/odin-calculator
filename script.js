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

//Object Variables
const myCalculator = new Calculator();
const operandOne = new Operand();
const operandTwo = new Operand();
const operator = new Operator();

//DOM Queries
const display = document.querySelector('.display-area');
// const inputButtons = Array.from(document.querySelectorAll('.input-button'));
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
    // deleteBtn: "",
    // emptyBtn: "",
}

function setDisplay(str) {
    display.textContent = str;
}
function clearDisplay() {
    display.textContent = 0;
    resetCalculation();
}

setDisplay(0);

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

function resetCalculation() {
    operandOne.clear();
    operandTwo.clear();
    operator.clear();
}

function handleNumeric(digit) {
    if(operator.isEmpty()) {
        operandOne.value += digit;
        setDisplay(`${operandOne.value}`);
    }
    else {
        operandTwo.value += digit;
        setDisplay(`${operandOne.value} ${operator.value} ${operandTwo.value}`);
    }
}
function handleOperator(op) {
    if(!operandOne.isEmpty() && operator.isEmpty()) {
        operator.value = op;
        setDisplay(`${operandOne.value} ${operator.value}`);
    }
}
function computeResult() {
    if (!operandOne.isEmpty() && !operator.isEmpty() && !operandTwo.isEmpty()) {
        let result = myCalculator.operate(operandOne.value, operandTwo.value, operator.value);
        setDisplay(`${operandOne.value} ${operator.value} ${operandTwo.value} = ${result}`);
        resetCalculation();
    }
}