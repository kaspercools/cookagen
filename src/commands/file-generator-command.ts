import { ICommand } from "./icommand";
import { ExpressionInterpreter } from "../interpreter/expression-builder";
import { CamelCaseExpression } from "../interpreter/camelcase-expression";
import DataExpression from "../interpreter/temrinal-expression";
import { PascalCaseExpression } from "../interpreter/pascalcase-expression";
import { FileInterpreter } from "../interpreter/fileinterpreter";
import { PatternData } 
from "../pattern-data";
import * as _ from 'lodash';  

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
  methodChainList: any;
  autoCreateFolders: boolean;

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
    patterns: PatternData[],
    methodChainList: any[],
    autoCreateFolders = false
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
    this.patternDataList = _.clone(patterns);
    this.methodChainList = methodChainList;
    this.autoCreateFolders = (typeof (autoCreateFolders) === undefined) ? false : autoCreateFolders;
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

        console.log(this.getFileName(this.destPath));

        const folderPath = `${process.cwd()}/${this.getFileName(this.destPath)}`;
        const filePath = `${folderPath}/${this.getFileName(
          fileRef.resFile
        )}.${this.fileExt}`;



        if (fs.existsSync(filePath)) {
          console.log(chalk.red(`I already created this file! (${filePath})`));

          // Do something
          process.exit();
        } else if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }

        fs.readFile(path, (err: any, data: any) => {
          if (err) throw err;

          fs.writeFile(
            filePath,
            new FileInterpreter().interpretFile(
              data.toString(),
              this.patternDataList
            ),
            function (err: any) {
              if (err) {
                return console.log(err);
              }

              console.log(chalk.yellow(`The file was saved! (${filePath})`));
            }
          );
        });
      }
    );

    this.methodChainList.forEach((methodInChain: any) => {
      methodInChain(entryList)
    });
  }
  getFileName(
    filePath: string
  ) {


    let result = filePath;
    const expInterpreter = new ExpressionInterpreter();
    this.patternDataList.forEach((currentPattern, index) => {

      result = expInterpreter
        .interpret(`{{${currentPattern.match}}}`)
        .interpret(result, currentPattern.val);
    });

    return result;
  }
}
