function Calculator() {
    let operand1 = 0;
    let operand2 = 0;
    let operation = '';
    let result = 0;
    let add = function () {
        result = operand1 + operand2;
    };
    let subtract = function () {
        result = operand1 - operand2;
    };
    let multiply = function () {
        result = operand1 * operand2;
    };
    let divide = function () {
        result = operand1 / operand2;
    };
    this.reset = function () {
        operand1 = 0;
        operand2 = 0;
        operation = '';
        result = 0;
    };
    this.operate = function (a, b, op) {
        operand1 = a;
        operand2 = b;
        switch (op) {
            case '+':
                operation = op;
                add();
                break;
            case '-':
                operation = op;
                subtract();
                break;
            case '*':
                operation = op;
                multiply();
                break;
            case '/':
                operation = op;
                divide();
                break;
            default:
                this.reset();
                break;
        }
        return result;
    };
    Object.defineProperty(this, 'operand1', {
        get: function () {
            return operand1;
        }
    });
    Object.defineProperty(this, 'operand2', {
        get: function () {
            return operand2;
        }
    });
    Object.defineProperty(this, 'operation', {
        get: function () {
            return operation;
        }
    });
    Object.defineProperty(this, 'result', {
        get: function () {
            return result;
        }
    });
}

const myCalculator = new Calculator();

//DOM Queries
const display = document.querySelector('.display-area');
// const inputButtons = Array.from(document.querySelectorAll('.input-button'));
const buttonParent = document.querySelector('.button-area');

const numericButtons = {
    num0Btn: 0,
    num1Btn: 1,
    num2Btn: 2,
    num3Btn: 3,
    num4Btn: 4,
    num5Btn: 5,
    num6Btn: 6,
    num7Btn: 7,
    num8Btn: 8,
    num9Btn: 9,
}

const operatorButtons = {
    addBtn: "+",
    subtractBtn: "-",
    multiplyBtn: "*",
    divideBtn: "/",
    resultBtn: "=",
}

const methodButtons = {
    // decimalBtn: ".",
    clearBtn: clearDisplay,
    // deleteBtn: "",
    // emptyBtn: "",
}

function setDisplay(str) {
    display.textContent = str;
}
function clearDisplay(initial = '') {
    display.textContent = initial;
}

setDisplay(0);

buttonParent.addEventListener('click', (e) => {
    let btnId = e.target.id;

    if (btnId in numericButtons) {
        setDisplay(numericButtons[btnId]);
    }else if(btnId in operatorButtons) {
        setDisplay(operatorButtons[btnId]);
    }else if(btnId in methodButtons) {
        methodButtons[btnId](0);
    }
});