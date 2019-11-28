import { IExpression } from "./abstract-interpreter";

export class LowerCaseExpression implements IExpression{

    private expression:IExpression;

    constructor(expression:IExpression) {
        this.expression = expression;
    }

    interpret(context: string, data:string): string {
        data = this.expression.interpret(context, data);
        
        return data.toLowerCase();
    }

}