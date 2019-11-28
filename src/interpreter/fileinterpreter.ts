import { ExpressionInterpreter } from "./expression-builder";
import { PatternData } from "../pattern-data";
import * as _ from 'lodash';

export class FileInterpreter {
  public interpretFile(fileData: any, patternDataList: PatternData[]): string {

    fileData = this.interpret(fileData, patternDataList);

    return fileData;
  }

  private interpret(fileData: any, patternDataList: PatternData[]): string {

    const expressionInterpreter = new ExpressionInterpreter();

    var res = fileData.match(/[\{]{2}\$\w* *[\|]* *\w+[\}]{2}|[\{]{2}\$\w*[\|]*\w+[\}]{2}/i);

    if (res != null) {
      patternDataList.forEach(pattern => {
        if (res[0].includes(`{{${pattern.match}`)) {
          const expressionString = res[0].replace(' ', '').trim().replace("{{", "").replace("}}", "");

          var resExpression = expressionInterpreter.interpret(expressionString);

          var result = resExpression.interpret(
            (expressionString + "").replace(' ', '').split("|")[0],
            _.cloneDeep(pattern.val)
          );
          fileData = fileData.replace(res[0], result);
        }
      });
      
      const interpretVal = this.interpret(fileData, patternDataList);
      return interpretVal;
    }else{
      return fileData;
    }
  }
}
