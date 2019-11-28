import { ExpressionInterpreter } from "./expression-builder";
import { PatternData } from "../pattern-data";

export class FileInterpreter {
  public interpretFile(fileData: any, patternDataList: PatternData[]): string {
    patternDataList.forEach((patternData: PatternData) => {
      fileData = this.interpret(fileData, patternData.val, patternData.match);
    });
    return fileData;
  }

  private interpret(fileData: any, data: any, pattern: string): string {
    const expressionInterpreter = new ExpressionInterpreter();

    var res = fileData.match(/[\{]{2}\$\w* *[\|]* *\w+[\}]{2}|[\{]{2}\$\w*[\|]*\w+[\}]{2}/i);
    
    if (res != null && fileData.includes(pattern)) {
      const expressionString = res[0].replace(' ','').trim().replace("{{", "").replace("}}", "");
      
      var resExpression = expressionInterpreter.interpret(expressionString);
      
      var result = resExpression.interpret(
        (expressionString + "").replace(' ','').split("|")[0],
        data
      );    
      
      fileData = fileData.replace(res[0], result);
      
      return this.interpret(fileData, data, pattern);
    } else {
      return fileData;
    }
  }
}
