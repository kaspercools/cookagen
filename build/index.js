"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expression_builder_1 = require("./interpreter/expression-builder");
var world = '🗺️';
function hello(word) {
    if (word === void 0) { word = world; }
    return "Hello " + world + "! ";
}
exports.hello = hello;
function interpreterTest() {
    var interpreter = new expression_builder_1.ExpressionInterpreter();
    var expression = "{{$Entity|lowerCase}}";
    var result = interpreter.interpret(expression.replace("{{", "").replace("}}", ""), "TenantSubscription");
    console.log(result.interpret(expression.replace("{{", "").replace("}}", "")));
}
exports.interpreterTest = interpreterTest;
console.log(hello());
interpreterTest();
