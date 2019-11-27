"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expression_factory_1 = require("./expression-factory");
var ExpressionInterpreter = /** @class */ (function () {
    function ExpressionInterpreter() {
        this.expressionFactory = new expression_factory_1.ExpressionFactory();
    }
    ExpressionInterpreter.prototype.interpret = function (context, needle, data) {
        // parse context and create expression
        var expressions = context.split("|");
        var reversedExpressions = expressions.reverse();
        var lastExpression = reversedExpressions.pop() + '';
        expressions = reversedExpressions.reverse();
        //ENTITY | lowercase | camelCase
        return this.expressionFactory.createExpressionTree(expressions).interpret(lastExpression);
    };
    return ExpressionInterpreter;
}());
exports.ExpressionInterpreter = ExpressionInterpreter;
