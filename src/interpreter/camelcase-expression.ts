import { IExpression } from "./abstract-interpreter";

export class CamelCaseExpression implements IExpression{
    private expression:IExpression;

    constructor(expression:IExpression) {
        this.expression = expression;
    }

    interpret(context: string, data: string): string {
        const dataString = this.expression.interpret(context, data);
        
        return dataString.charAt(0).toLowerCase() + dataString.substring(1);
    }

}