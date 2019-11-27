"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var temrinal_expression_1 = __importDefault(require("./temrinal-expression"));
var lowercase_expression_1 = require("./lowercase-expression");
var camelcase_expression_1 = require("./camelcase-expression");
var no_expression_1 = require("./no-expression");
var ExpressionFactory = /** @class */ (function () {
    function ExpressionFactory() {
    }
    ExpressionFactory.prototype.createExpressionTree = function (expressions) {
        var expression = new no_expression_1.NoExpression();
        var lastExpression = expressions.pop();
        return this.createExpression(this.createExpressionTree(expressions), lastExpression);
    };
    ExpressionFactory.prototype.createExpression = function (data, operation) {
        if (operation === void 0) { operation = ''; }
        var expression = null;
        switch (operation) {
            case 'lowerCase':
                expression = new lowercase_expression_1.LowerCaseExpression(data);
                break;
            case 'camelCase':
                expression = new camelcase_expression_1.CamelCaseExpression(data);
                break;
            default:
                expression = new temrinal_expression_1.default();
        }
        return expression;
    };
    return ExpressionFactory;
}());
exports.ExpressionFactory = ExpressionFactory;
