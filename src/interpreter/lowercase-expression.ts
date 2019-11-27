import { IExpression } from "./abstract-interpreter";

export class LowerCaseExpression implements IExpression{

    private expression:IExpression;

    constructor(expression:IExpression) {
        this.expression = expression;
    }

    interpret(context: string): string {
        const data = this.expression.interpret(context);
        
        return data.toLowerCase();
    }

}