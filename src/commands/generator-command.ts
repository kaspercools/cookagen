import chalk from "chalk";
import { FileInterpreter } from "../interpreter/fileinterpreter";
import { PatternData } from "../pattern-data";

export abstract class GeneratorCommand{
    patternDataList: PatternData[];
    command: string;

    constructor(command: string, patternDataList:PatternData[]){
        this.patternDataList=patternDataList;
        this.command=command;
    }
    getFileName(filePath: string) {
        const result = new FileInterpreter().interpret(
            filePath,
            this.patternDataList
        );

        return result;
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
            console.log(chalk.red("NO ARGS... TRY AGAIN!"));
            process.exit();
          }
    }
}