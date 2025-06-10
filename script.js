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