import { ICommand } from "./icommand";
import { ExpressionInterpreter } from "../interpreter/expression-builder";
import { CamelCaseExpression } from "../interpreter/camelcase-expression";
import DataExpression from "../interpreter/temrinal-expression";
import { PascalCaseExpression } from "../interpreter/pascalcase-expression";
import { FileInterpreter } from "../interpreter/fileinterpreter";
import { PatternData } from "../pattern-data";
import * as _ from "lodash";
import { MethodGeneratorCommand } from "./method-generator-command copy";
import { IExpression } from "../interpreter/abstract-interpreter";
import { createWriteStream } from "fs";

var fs = require("fs");
var chalk = require("chalk");

export class FileGeneratorCommand implements ICommand {
  alterations: MethodGeneratorCommand[] = [];
  destPath: string;
  subType: string;
  subTypeFiles: { file: string; resFile: string }[];
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
    subTypeFiles: { file: string; resFile: string }[],
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
    this.autoCreateFolders =
      typeof autoCreateFolders === undefined ? false : autoCreateFolders;
  }

  build(program: any): any {
    console.log(`${this.command} [entryList...]`);

    program.command(`${this.command} [entryList...]`);
    this.options.forEach((optionVal: { option: string; variable: string }) => {
      program.option(optionVal.option);
    });

    return program;
  }

  async action(entryList: any) {
    console.log(
      chalk.greenBright(
        this.command.charAt(0).toUpperCase() +
          this.command.substring(1) +
          " command called"
      )
    );

    if (entryList.length == 0) {
      console.log(chalk.red("NO ARGS!!!"));
      process.exit();
    }

    const entity = entryList[0];

    this.patternDataList.forEach((pattern, index) => {
      if (entryList.length > index) {
        pattern.val = entryList[index];
      }
    });

    this.subTypeFiles.forEach(
      (fileRef: { file: string; resFile: string }, index) => {
        const path = `${process.cwd()}/${this.templatePath}/${this.subType}/${
          fileRef.file
        }`;

        const destFileName = this.getFileName(fileRef.resFile);
        console.log(this.getFileName(this.destPath));

        const folderPath = `${process.cwd()}/${this.getFileName(
          this.destPath
        )}`;
        const filePath = `${folderPath}/${destFileName}.${this.fileExt}`;

        if (fs.existsSync(filePath)) {
          console.log(
            chalk.magenta(`You already created this file! (${filePath})`)
          );

          // Do something
          return;
        } else if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }

        let templateFile = fs.readFileSync(path, "utf8");

        templateFile = new FileInterpreter().interpretFile(
          templateFile.toString(),
          _.cloneDeep(this.patternDataList)
        );

        fs.writeFileSync(
          filePath,
          new FileInterpreter().interpretFile(
            templateFile,
            this.patternDataList
          ),
          "utf8"
        );

        console.log(
          chalk.greenBright(`I created a file for you (${filePath})`)
        );
      }
    );

    this.methodChainList.forEach((methodInChain: any) => {
      methodInChain(entryList);
    });

    this.alterations.forEach((alteration: MethodGeneratorCommand) => {
      alteration.action(entryList);
    });
  }
  getFileName(filePath: string) {
    const result = new FileInterpreter().interpret(
      filePath,
      this.patternDataList
    );

    return result;
  }

  setAlterations(alterations: MethodGeneratorCommand[]) {
    this.alterations = alterations;
  }
}
