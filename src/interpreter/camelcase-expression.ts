import { IExpression } from "./abstract-interpreter";

export class CamelCaseExpression implements IExpression{
    private expression:IExpression;

    constructor(expression:IExpression) {
        this.expression = expression;
    }

    interpret(context: string): string {
        const data = this.expression.interpret(context);
        
        return data.charAt(0).toLowerCase() + data.substring(1);
    }

}