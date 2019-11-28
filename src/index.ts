#!/usr/bin/env node

import { FileGeneratorCommand } from "./commands/file-generator-command";
import { MethodGeneratorCommand } from "./commands/method-generator-command copy";
import * as _ from 'lodash';  
const fs = require("fs");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
let program = require("commander");

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

  cmdMap.set(generator.cmd, cmd);

  //create alterations
  let alterations:MethodGeneratorCommand[]=[];
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
  };

  program
    .command(`${generator.cmd} [entryList...]`)
    .alias(generator.alias)
    .description("creates a class")
    .action((entryList: any) => {
      cmd.action(entryList);
      alterations.forEach((alteration: MethodGeneratorCommand) => {
        alteration.action(entryList);
      });
    });
});

// var domainCmd = new FileGeneratorCommand(
//   "domain",
//   [],
//   "create a domain object",
//   "templates",
//   "LegalRegister.Domain",
//   "domain",
//   [{ file: "entity.tpl", resFile: "{{$ENTITY}}", §: "{{$ENTITY}}" }],
//   "cs",
//   "",
//   parseList
// );

// var serviceCmd = new FileGeneratorCommand(
//   "service",
//   [],
//   "create a domain object",
//   "templates",
//   "LegalRegister.Services",
//   "services",
//   [
//     {
//       file: "service.tpl",
//       resFile: "{{$ENTITY}}Service",
//       needle: "{{$ENTITY}}"
//     },
//     {
//       file: "iservice.tpl",
//       resFile: "I{{$ENTITY}}Service",
//       needle: "{{$ENTITY}}"
//     }
//   ],
//   "cs",
//   "",
//   parseList
// );

// program
//   .command(`domain [entryList...]`)
//   .alias("d")
//   .description("creates a domain class")
//   .action((entryList: any) => {
//     domainCmd.action(entryList);
//   });

// program
//   .command(`service [entryList...]`)
//   .alias("s")
//   .description("creates a service class")
//   .action((entryList: any) => {
//     serviceCmd.action(entryList);
//   });

program.parse(process.argv);
