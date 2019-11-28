import { ICommand } from "./icommand";
import { ExpressionInterpreter } from "../interpreter/expression-builder";
import { CamelCaseExpression } from "../interpreter/camelcase-expression";
import DataExpression from "../interpreter/temrinal-expression";
import { PascalCaseExpression } from "../interpreter/pascalcase-expression";
import { FileInterpreter } from "../interpreter/fileinterpreter";
import { PatternData } from "../pattern-data";
var fs = require("fs");

export class ServiceGeneratorCommand implements ICommand {
  destPath: string;
  subType: string;
  subTypeFile: string;
  fileExt: string;
  patternDataList: PatternData[];
  description: string;
  command: string;
  options: any[];
  templatePath: string;

  constructor(
    command: string,
    options: { option: string; variable: string }[],
    description: string,
    templatePath: string,
    destPath: string,
    subType: string,
    subTypeFile: string,
    fileExt: string,
    patterns: PatternData[]
  ) {
    this.templatePath = templatePath;
    this.command = command;
    this.description = description;
    this.options = options;
    this.destPath = destPath;
    this.subType = subType;
    this.subTypeFile = subTypeFile;
    this.fileExt = fileExt;
    this.patternDataList = patterns;
  }

  build(program: any): void {
    const cmd = program.command(`${this.command} <entity>`);
    this.options.forEach((optionVal: { option: string; variable: string }) => {
      cmd.option(optionVal.option);
    });

    cmd.description(this.description).action((entity: any) => {
      console.log(this.command + " command called");

      const path = `${process.cwd()}/${this.templatePath}/${this.subType}/${
        this.subTypeFile
      }`;

      fs.readFile(path, (err: any, data: any) => {
        if (err) throw err;
        fs.writeFile(
          `${process.cwd()}/${this.destPath}/${new PascalCaseExpression(
            new DataExpression(entity)
          ).interpret(entity, entity)}.${this.fileExt}`,
          new FileInterpreter().interpretFile(
            data.toString(),
            this.patternDataList
          ),
          function(err: any) {
            if (err) {
              return console.log(err);
            }
            console.log("The file was saved!");
          }
        );
      });
    });
  }
}
