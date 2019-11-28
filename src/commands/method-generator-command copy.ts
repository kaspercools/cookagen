import { ICommand } from "./icommand";
import { ExpressionInterpreter } from "../interpreter/expression-builder";
import { CamelCaseExpression } from "../interpreter/camelcase-expression";
import DataExpression from "../interpreter/temrinal-expression";
import { PascalCaseExpression } from "../interpreter/pascalcase-expression";
import { FileInterpreter } from "../interpreter/fileinterpreter";
import { PatternData } from "../pattern-data";
var fs = require("fs");
import * as _ from 'lodash';
var chalk = require("chalk");

export class MethodGeneratorCommand implements ICommand {
  destPath: string;
  subType: string;
  templates: { file: string, target: string }[];
  fileExt: string;
  patternDataList: PatternData[];
  description: string;
  command: string;
  options: any[];
  templatePath: string;
  suffix: string;
  methodChainList: any;
  autoCreateFolders: boolean;
  entryPoint: string;

  constructor(
    command: string,
    options: { option: string; variable: string }[],
    description: string,
    templatePath: string,
    destPath: string,
    subType: string,
    templates: { file: string, target: string }[],
    entryPoint: string,
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
    this.templates = templates;
    this.suffix = suffix;
    this.fileExt = fileExt;
    this.patternDataList = _.clone(patterns);//([]as any).push(patterns);
    this.methodChainList = methodChainList;
    this.entryPoint = `//${entryPoint}`;
    this.autoCreateFolders = (typeof (autoCreateFolders) === undefined) ? false : autoCreateFolders;
  }

  build(program: any): any {
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
      console.log("NO ARGS... TRY AGAIN!");
      process.exit();
    }

    const entity = entryList[0];

    this.patternDataList.forEach((pattern, index) => {
      if (entryList.length > index) {
        pattern.val = entryList[index];
      }
    });
    this.templates.forEach(
      (
        template: { file: string, target: string },
        index
      ) => {
        console.log("New Template run");

        const path = `${process.cwd()}/${this.templatePath}/${this.subType}/${
          template.file
          }`;

        const folderPath = `${process.cwd()}/${this.getFileName(this.destPath)}`;
        const filePath = `${folderPath}/${this.getFileName(
          template.target
        )}`;

        if (!fs.existsSync(folderPath)) {
          console.log(chalk.red(`Cannot access ${folderPath}... skipping alteration ${this.command}`));

          return;
        }

        //read Template
        let methodString = fs.readFileSync(path, 'utf8');
        var classString = fs.readFileSync(filePath, 'utf8');
        //process classString;

        methodString = new FileInterpreter().interpretFile(
          methodString.toString(),
          _.cloneDeep(this.patternDataList)
        );

        console.log(methodString);
        console.log(classString);

        classString = classString.replace(`${this.entryPoint}`, `\t${methodString}\n\n\t\t${this.entryPoint}`);
        fs.writeFileSync(filePath, classString, 'utf8');
        console.log(classString);

        // fs.writeFile(
        //   filePath,
        //   new FileInterpreter().interpretFile(
        //     methodString.toString(),
        //     this.patternDataList
        //   ),
        //   function (err: any) {
        //     if (err) {
        //       return console.log(err);
        //     }

        //     console.log(chalk.yellow(`The file was saved! (${filePath})`));
        //   }
        // );
      }
    );

  }

  private getFileName(
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