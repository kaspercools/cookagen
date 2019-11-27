"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParseExpression = /** @class */ (function () {
    function ParseExpression(subject, operation) {
        this.subject = subject;
        this.operation = operation;
    }
    ParseExpression.prototype.interpret = function (context) {
        return this.operation.interpret(this.subject.interpret(context));
    };
    return ParseExpression;
}());
exports.ParseExpression = ParseExpression;
