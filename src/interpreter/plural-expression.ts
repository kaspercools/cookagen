import { IExpression } from "./abstract-interpreter";
var pluralize = require("pluralize");

export class PluralExpression implements IExpression {
  private expression: IExpression;

  constructor(expression: IExpression) {
    this.expression = expression;
  }

  interpret(context: string, data: string): string {
    const dataString = this.expression.interpret(context, data);

    return pluralize.plural(dataString);
  }
}
