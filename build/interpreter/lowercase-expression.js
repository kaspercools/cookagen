"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LowerCaseExpression = /** @class */ (function () {
    function LowerCaseExpression(expression) {
        this.expression = expression;
    }
    LowerCaseExpression.prototype.interpret = function (context) {
        var data = this.expression.interpret(context);
        return data.toLowerCase();
    };
    return LowerCaseExpression;
}());
exports.LowerCaseExpression = LowerCaseExpression;
