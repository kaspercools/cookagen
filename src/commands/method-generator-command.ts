import { ICommand } from "./icommand";
import { FileInterpreter } from "../interpreter/fileinterpreter";
import { PatternData } from "../pattern-data";
var fs = require("fs");
import * as _ from "lodash";
import { basename } from "path";
import { GeneratorCommand } from "./generator-command";
var chalk = require("chalk");

export class MethodGeneratorCommand extends GeneratorCommand implements ICommand {
  destPath: string;
  subType: string;
  templates: { file: string; target: string }[];
  fileExt: string;
  description: string;
 
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
    templates: { file: string; target: string }[],
    entryPoint: string,
    fileExt: string,
    suffix: string,
    patterns: PatternData[],
    methodChainList: any[],
    autoCreateFolders = false
  ) {
    super(command,_.clone(patterns));
    this.templatePath = templatePath;
    this.description = description;
    this.options = options;
    this.destPath = destPath;
    this.subType = subType;
    this.templates = templates;
    this.suffix = suffix;
    this.fileExt = fileExt;

    this.methodChainList = methodChainList;
    this.entryPoint = `/*${entryPoint}*/`;
    this.autoCreateFolders =
      typeof autoCreateFolders === undefined ? false : autoCreateFolders;
  }

  build(program: any): any {
    return program;
  }

  async action(entryList: any) {
    super.action(entryList);
    
    this.templates.forEach(
      (template: { file: string; target: string }, index) => {
        this.patternDataList.forEach((pattern, index) => {
          const entryForPattern = entryList.filter((e: any) =>
            e.startsWith(pattern.val)
          );
          if (entryForPattern.length > 0) {
            pattern.val = entryForPattern[0].replace(`${pattern.val}:`, "");
          }
        });

        console.log(chalk.yellow("New Template run"));

        const path = `${process.cwd()}/${this.templatePath}/${this.subType}/${
          template.file
          }`;

        const folderPath = `${process.cwd()}/${this.getFileName(
          this.destPath
        )}`;
        const filePath = `${folderPath}/${this.getFileName(template.target)}`;

        if (!fs.existsSync(folderPath)) {
          console.log(
            chalk.red(
              `Cannot access ${folderPath}... skipping alteration ${this.command}`
            )
          );

          return;
        }

        let methodString = fs.readFileSync(path, "utf8");
        var classString = fs.readFileSync(filePath, "utf8");

        methodString = new FileInterpreter().interpretFile(
          methodString.toString(),
          _.cloneDeep(this.patternDataList)
        );

        if (!classString.includes(methodString)) {
          classString = classString.replace(
            `${this.entryPoint}`,
            `${methodString}\n\t\t${this.entryPoint}`
          );
          fs.writeFileSync(filePath, classString, "utf8");
          console.log(
            chalk.greenBright(`I altered ${template.target} (${filePath})`)
          );
        }
      }
    );
  }
  
}
