import { ICommand } from "./icommand";
import { ExpressionInterpreter } from "../interpreter/expression-builder";
import { CamelCaseExpression } from "../interpreter/camelcase-expression";
import DataExpression from "../interpreter/temrinal-expression";
import { PascalCaseExpression } from "../interpreter/pascalcase-expression";
import { FileInterpreter } from "../interpreter/fileinterpreter";
import { PatternData } from "../pattern-data";
var fs = require("fs");
var chalk = require("chalk");

export class FileGeneratorCommand implements ICommand {
  destPath: string;
  subType: string;
  subTypeFiles: { file: string; resFile: string; }[];
  fileExt: string;
  patternDataList: PatternData[];
  description: string;
  command: string;
  options: any[];
  templatePath: string;
  suffix: string;

  constructor(
    command: string,
    options: { option: string; variable: string }[],
    description: string,
    templatePath: string,
    destPath: string,
    subType: string,
    subTypeFiles: { file: string; resFile: string; }[],
    fileExt: string,
    suffix: string,
    patterns: PatternData[]
  ) {
    this.templatePath = templatePath;
    this.command = command;
    this.description = description;
    this.options = options;
    this.destPath = destPath;
    this.subType = subType;
    this.subTypeFiles = subTypeFiles;
    this.suffix = suffix;
    this.fileExt = fileExt;
    this.patternDataList = patterns;
  }

  build(program: any): any {
    console.log(`${this.command} [entryList...]`);

    program.command(`${this.command} [entryList...]`);
    this.options.forEach((optionVal: { option: string; variable: string }) => {
      program.option(optionVal.option);
    });

    return program;
  }

  action(entryList: any) {
    console.log(
      chalk.greenBright(
        this.command.charAt(0).toUpperCase() +
          this.command.substring(1) +
          " command called"
      )
    );
    if (entryList.length == 0) {
      console.log("NO ARGS!!!");
      process.exit();
    }
    const entity = entryList[0];

    this.patternDataList.forEach((pattern, index) => {
      if (entryList.length > index) {
        pattern.val = entryList[index];
      }
    });

    this.subTypeFiles.forEach(
      (
        fileRef: { file: string; resFile: string; },
        index
      ) => {
        const path = `${process.cwd()}/${this.templatePath}/${this.subType}/${
          fileRef.file
        }`;

        const filePath = `${process.cwd()}/${this.destPath}/${this.getFileName(
          fileRef,
          this.patternDataList
        )}.${this.fileExt}`;

        if (fs.existsSync(filePath)) {
          console.log(chalk.red("Already created!"));

          // Do something
          process.exit();
        }

        fs.readFile(path, (err: any, data: any) => {
          if (err) throw err;

          fs.writeFile(
            filePath,
            new FileInterpreter().interpretFile(
              data.toString(),
              this.patternDataList
            ),
            function(err: any) {
              if (err) {
                return console.log(err);
              }
              console.log(chalk.yellow(`The file was saved! (${filePath})`));
            }
          );
        });
      }
    );
  }
  getFileName(
    fileRef: { file: string; resFile: string;},
    patternDataList: PatternData[]
  ) {
    let result = fileRef.resFile;
    const expInterpreter = new ExpressionInterpreter();
    this.patternDataList.forEach((currentPattern, index) => {
      result = expInterpreter
        .interpret(currentPattern.match)
        .interpret(result, currentPattern.val);
    });

    return result;
  }
}
