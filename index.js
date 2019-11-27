#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const Configstore = require('configstore');
const inquirer = require('./lib/inquirer');
const github = require('./lib/github');
const repo = require('./lib/repo');
const commander = require('commander');
const program = new commander.Command();

const conf = new Configstore('ginit');
program.version('0.0.1');

clear();
console.log(
    chalk.blueBright(
        figlet.textSync('ginit', { horizontalLayout: 'full' })
    )
);

program
    .option('-l, --list', 'list organistaions');

program
    .command('setup [env]')
    .description('run setup commands for all envs')
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action(function (env, options) {
        const mode = options.setup_mode || "normal";
        env = env || 'all';
        console.log('setup for %s env(s) with %s mode', env, mode);
    });

program
    .command('new')
    .description('new repo')
    .action(async () => {

        if (files.directoryExists('.git')) {
            console.log(chalk.red('Already a Git repository!'));
            process.exit();
        }
        // Create remote repository
        const url = await repo.createRemoteRepo();

        // Create.gitignore file
        await repo.createGitignore();

        // Set up local repository and push to remote
        await repo.setupRepo(url);
        console.log(chalk.green('All done!'));
    });

program
    .command('orgs')
    .description('list organisations')
    .action(async () => {
        inquirer.askOrganisationDetails();
    });


const getGithubToken = async () => {
    // Fetch token from config store
    let token = github.getStoredGithubToken();
    if (token) {
        return token;
    }

    // No token found, use credentials to access GitHub account
    await github.setGithubCredentials();

    // register new token
    token = await github.registerNewToken();
    return token;
};

const run = async (program) => {
    try {
        // Retrieve & Set Authentication Token
        const token = await getGithubToken();
        github.githubAuth(token);
        if (process.argv.length > 0) {
            program.parse(process.argv);
        } else {
            console.log();
            console.log(chalk.redBright('Command me I tell you!'));
        }

    } catch (err) {
        if (err) {
            switch (err.status) {
                case 401:
                    console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
                    break;
                case 422:
                    console.log(chalk.red('There already exists a remote repository with the same name'));
                    break;
                default:
                    console.log(err);
            }
        }
    }
};

run(program);