import { IExpression } from "./abstract-interpreter";

export class NoExpression implements IExpression{
    interpret(context: string): string {
return context;
    }

}