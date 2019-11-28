#!/usr/bin/env node

import { FileGeneratorCommand } from "./commands/file-generator-command";

const fs = require("fs");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
let program = require("commander");

const parseList = [
  { val: "entity", match: "$ENTITY" },
  { val: "command", match: "$CMD" },
  { val: "Guid", match: "$KEY" }
];
clear();
console.log(
  chalk.blue(figlet.textSync("cookagen-cli", { horizontalLayout: "full" }))
);
program.version("0.0.1").description("A code generation tool");

program.outputHelp();

if (!fs.existsSync("./cookagen.json")) {
  console.log(
    chalk.red("No cookagen config found! Make sure you are in the right folder")
  );
  process.exit();
}
let rawdata = fs.readFileSync("cookagen.json");
let cookagenConfig = JSON.parse(rawdata);

cookagenConfig.generators.forEach((generator: any) => {
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
    generator.parseList
  );

  program
    .command(`${generator.cmd} [entryList...]`)
    .alias(generator.alias)
    .description("creates a class")
    .action((entryList: any) => {
      cmd.action(entryList);
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
