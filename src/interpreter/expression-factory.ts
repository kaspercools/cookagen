import DataExpression from "./temrinal-expression";
import { IExpression } from "./abstract-interpreter";
import { LowerCaseExpression } from "./lowercase-expression";
import { CamelCaseExpression } from "./camelcase-expression";
import { NoExpression } from "./no-expression";

export class ExpressionFactory{
    createExpressionTree(expressions: string[], needle:string, data:string):IExpression {
        const expression = new NoExpression();
        
        let lastExpression = expressions.pop();
        this.createExpression(this.createExpressionTree(expressions, needle, data),lastExpression);
        return new NoExpression();
    }
    
    public createExpression(data:IExpression, operation =''):IExpression{
        let expression = null;

        switch(operation){
            case 'lowerCase':
                expression = new LowerCaseExpression(data);
                break;
                case 'camelCase':
                expression = new CamelCaseExpression(data);
                break;
                default:
                    expression = new DataExpression();
        }
        
        return expression;
    }

}