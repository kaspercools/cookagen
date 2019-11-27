"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataExpression = /** @class */ (function () {
    function DataExpression(needle, data) {
        this.data = data;
        this.needle = needle;
    }
    DataExpression.prototype.interpret = function (context) {
        if (context === void 0) { context = ''; }
        if (context == this.needle) {
            context = context.replace(this.needle, this.data);
        }
        return context;
    };
    return DataExpression;
}());
exports.default = DataExpression;
