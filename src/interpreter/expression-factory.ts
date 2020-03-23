import DataExpression from "./temrinal-expression";
import { IExpression } from "./abstract-interpreter";
import { LowerCaseExpression } from "./lowercase-expression";
import { CamelCaseExpression } from "./camelcase-expression";
import { NoExpression } from "./no-expression";
import { PluralExpression } from "./plural-expression";
import { PascalCaseExpression } from "./pascalcase-expression";
import { HypheniseExpression } from './hyphenise-expression';

export class ExpressionFactory {
  createExpressionTree(expressions: string[]): IExpression {
    const expression = new NoExpression();

    if (expressions.length > 1) {
      let lastExpression = expressions.pop();
      return this.createExpression(
        this.createExpressionTree(expressions),
        lastExpression
      );
    } else {
      return new DataExpression(expressions[0]);
    }
  }

  public createExpression(data: IExpression, operation = ""): IExpression {
    let expression = new NoExpression();
    switch (operation) {
      case "lowerCase":
        expression = new LowerCaseExpression(data);
        break;
      case "camelCase":
        expression = new CamelCaseExpression(data);
        break;
      case "pascalCase":
        expression = new PascalCaseExpression(data);
        break;
      case "plural":
        expression = new PluralExpression(data);
        break;
      case "hyphenise":
        console.log("hyphenise");

        expression = new HypheniseExpression(data);
        break;
    }

    return expression;
  }
}
