import { IExpression } from "./abstract-interpreter";

export class NoExpression implements IExpression{
    interpret(context: string, data:string): string {
        return context;
    }

}