import { IExpression } from "./abstract-interpreter";
import { ExpressionFactory } from "./expression-factory";
import DataExpression from "./temrinal-expression";

export class ExpressionInterpreter {
    
    expressionFactory: ExpressionFactory;

    constructor() {
        this.expressionFactory = new ExpressionFactory();   
    }

    interpret(expression: string): IExpression {
        // parse context and create expression
               
        let expressions = (expression + '').replaceAll(" ","").trim().split("|");
        console.log(expressions);
        
        return this.expressionFactory.createExpressionTree(expressions);
    }
}