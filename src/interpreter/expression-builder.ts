import { IExpression } from "./abstract-interpreter";
import { ExpressionFactory } from "./expression-factory";
import DataExpression from "./temrinal-expression";
import { reverse } from "dns";

export class ExpressionInterpreter {
    
    expressionFactory: ExpressionFactory;

    constructor() {
        this.expressionFactory = new ExpressionFactory();   
    }

    interpret(expression: string): IExpression {
        // parse context and create expression
        let expressions = context.split("|");
        const reversedExpressions = expressions.reverse();
        let lastExpression = reversedExpressions.reverse().pop()+'';

        //ENTITY | lowercase | camelCase
        return this.expressionFactory.createExpressionTree(expressions, needle, data).interpret(lastExpression);
    }
}