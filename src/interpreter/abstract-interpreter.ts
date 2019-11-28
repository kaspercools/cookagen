export interface IExpression{
    interpret(context:string, data:string):string;
}