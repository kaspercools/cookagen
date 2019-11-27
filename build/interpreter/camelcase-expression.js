"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CamelCaseExpression = /** @class */ (function () {
    function CamelCaseExpression(expression) {
        this.expression = expression;
    }
    CamelCaseExpression.prototype.interpret = function (context) {
        var data = this.expression.interpret(context);
        return data.charAt(0).toLowerCase() + data.substring(1);
    };
    return CamelCaseExpression;
}());
exports.CamelCaseExpression = CamelCaseExpression;
