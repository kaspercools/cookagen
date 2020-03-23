import { IExpression } from "./abstract-interpreter";

export class HypheniseExpression implements IExpression {
    private expression: IExpression;

    constructor(expression: IExpression) {
        this.expression = expression;
    }

    interpret(context: string, data: string): string {
        const dataString = this.expression.interpret(context, data);

        const letters = dataString.split('');
        let resultString = letters[0].toLowerCase();
        for (var i = 1; i < letters.length; i++) {
            if (letters[i] === letters[i].toUpperCase()
                && letters[i] !== letters[i].toLowerCase()) {
                resultString += "-";
                letters[i] = letters[i].toLowerCase();
            }
            resultString += letters[i];
        }
        return resultString;
    }

}