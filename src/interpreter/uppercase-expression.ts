import { IExpression } from "./abstract-interpreter";
var pluralize = require("pluralize");

export class UpperCaseExpression implements IExpression {
  private expression: IExpression;

  constructor(expression: IExpression) {
    this.expression = expression;
  }

  interpret(context: string, data: string): string {
    const dataString = this.expression.interpret(context, data);

    return dataString.toUpperCase();
  }
}
