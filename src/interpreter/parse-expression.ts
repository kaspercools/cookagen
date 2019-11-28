import { IExpression } from "./abstract-interpreter";

export class ParseExpression implements IExpression{

    private subject:IExpression;
    private operation:IExpression;

    constructor(subject:IExpression, operation:IExpression) {
        this.subject=subject;
        this.operation=operation;
    }

    interpret(context: string, data: string): string {
        return this.operation.interpret(this.subject.interpret(context, data), data);
    }
}