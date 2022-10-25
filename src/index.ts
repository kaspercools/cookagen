#!/usr/bin/env node

import { FileGeneratorCommand } from "./commands/file-generator-command";
import { MethodGeneratorCommand } from "./commands/method-generator-command";
import * as _ from 'lodash';
import { FileInterpreter } from "./interpreter/fileinterpreter";
const fs = require("fs");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
let program = require("commander");

declare global { interface String { replaceAll(search: string, replacement: string): string; } }

String.prototype.replaceAll = function (search: string, replacement: string): string {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

clear();

console.log(
  chalk.blue(figlet.textSync("cookagen-cli", { horizontalLayout: "full" }))
);
program.version("0.0.1").description("A code generation tool");

const cmdMap = new Map();
const methodAlterations = new Map();

// program.outputHelp();

if (!fs.existsSync("./cookagen.json")) {
  console.log(
    chalk.red("No cookagen config found! Make sure you are in the right folder")
  );
  process.exit();
}
//parse config
const rawdata = fs.readFileSync("cookagen.json");
const cookagenConfig = JSON.parse(rawdata);
//create generators

cookagenConfig.generators.forEach((generator: any) => {
  //create lambda chain
  const chainedLambdas: any[] = [];

  if (generator.chain) {
    generator.chain.forEach((chainedCmd: any) => {
      const newLambda = (entryList: any) => cmdMap.get(chainedCmd).action(entryList);
      chainedLambdas.push(newLambda);
    });
  }

  var cmd = new FileGeneratorCommand(
    generator.cmd,
    [],
    "create an object",
    cookagenConfig.templateFolder,
    generator.targetFolder,
    generator.templateRoot,
    generator.templates,
    generator.ext,
    "",
    _.cloneDeep(generator.parseList),
    chainedLambdas,
    generator.autoCreateFolders
  );


  //create alterations
  let alterations: MethodGeneratorCommand[] = [];
  if (generator.alterations) {
    alterations = generator.alterations.map((element: any) => {
      return new MethodGeneratorCommand(
        element.name,
        [],
        "create an object",
        cookagenConfig.templateFolder,
        element.targetFolder,
        element.templateRoot,
        element.templates,
        element.entryPoint,
        element.ext,
        "",
        _.cloneDeep(element.parseList),
        [],
        element.autoCreateFolders
      );
    })
    cmd.setAlterations(alterations);
  };

  cmdMap.set(generator.cmd, cmd);

  program
    .command(`${generator.cmd} [entryList...]`)
    .alias(generator.alias)
    .description("creates a class")
    .action((entryList: any) => {
      cmd.action(entryList);

    });
});

program.command(`test <pattern> [entryList...]`)
  .description('test your custom expression')
  .action((pattern: string, entryList: string[]) => {
    const patternList = [
      {
        "val": "command",
        "match": "$CMD"
      },
      {
        "val": "entity",
        "match": "$ENTITY"
      }
    ];

    patternList.forEach(pattern => {
      const entryForPattern = entryList.filter(e => e.startsWith(pattern.val));
      if (entryForPattern.length > 0) {
        pattern.val = entryForPattern[0].replace(`${pattern.val}:`, '');
      }
    });


    console.log(new FileInterpreter().interpret(pattern, patternList));
  });

program.parse(process.argv);
