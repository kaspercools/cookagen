import { IExpression } from "./abstract-interpreter";

export default class DataExpression implements IExpression {
  private needle: string;

  constructor(needle: string) {
    this.needle = needle;
  }

  interpret(context: string, data: string): string {
    if (context.includes(this.needle)) {
      context = context.replace(this.needle, data);
    }

    return context;
  }
}
