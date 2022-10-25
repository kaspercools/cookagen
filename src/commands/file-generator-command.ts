import { ICommand } from "./icommand";
import { FileInterpreter } from "../interpreter/fileinterpreter";
import { PatternData } from "../pattern-data";
import * as _ from "lodash";
import { MethodGeneratorCommand } from "./method-generator-command";
import { GeneratorCommand } from "./generator-command";

var fs = require("fs");
var chalk = require("chalk");

export class FileGeneratorCommand extends GeneratorCommand implements ICommand {
  alterations: MethodGeneratorCommand[] = [];
  destPath: string;
  subType: string;
  subTypeFiles: { file: string; resFile: string }[];
  fileExt: string;
  description: string;
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
    super(command, _.clone(patterns));
    this.templatePath = templatePath;
    this.description = description;
    this.options = options;
    this.destPath = destPath;
    this.subType = subType;
    this.subTypeFiles = subTypeFiles;
    this.suffix = suffix;
    this.fileExt = fileExt;
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
    

    this.patternDataList.forEach((pattern, index) => {
      const entryForPattern = entryList.filter((e: any) => e.startsWith(pattern.val));
      if (entryForPattern.length > 0) {
        pattern.val = entryForPattern[0].replace(`${pattern.val}:`, '');
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
  

  setAlterations(alterations: MethodGeneratorCommand[]) {
    this.alterations = alterations;
  }
}
