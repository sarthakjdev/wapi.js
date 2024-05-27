#!/usr/bin/env node

import process from 'node:process';
import { Option, program } from 'commander';
import chalk from 'chalk';

// eslint-disable-next-line import/no-named-as-default
import prompts from 'prompts';
import validateProjectName from 'validate-npm-package-name';
import packageJSON from '../package.json' assert { type: 'json' };
import { createWhatsappBot } from '../src/create-bot.js';
import { determinePackageManager } from '../src/reusable-function.js';

import { PackageManagerEnum } from '../src/type.js';

let projectDirectory = '';

const handleSigTerm = () => process.exit(0);

process.on('SIGINT', handleSigTerm);
process.on('SIGTERM', handleSigTerm);


async function setupProject() {
    // https://github.com/vercel/next.js/blob/canary/packages/create-next-app/index.ts#L24-L32
    const onPromptState = (state: any) => {
        if (state.aborted) {
            // If we don't re-enable the terminal cursor before exiting
            // the program, the cursor will remain hidden
            process.stdout.write('\u001B[?25h');
            process.stdout.write('\n');
            process.exit(1);
        }
    };

    program
        .name(packageJSON.name)
        .version(packageJSON.version)
        .description('Create a starter whatsapp bot using wapi.js.')
        .argument('[directory]', 'What is the name of the directory you want to create this project in?')
        .usage(`${chalk.green('<directory>')}`)
        .action((directory) => {
            projectDirectory = directory;
        })
        .option('--typescript', 'Whether to use the TypeScript template.')
        .option('--javascript', 'Whether to use the JavaScript template.')
        .option('--no-install', 'Whether to not automatically install the packages.')
        .addOption(
            new Option('--package-manager <packageManager>', 'The package manager to use.')
                .choices([PackageManagerEnum.Npm, PackageManagerEnum.Pnpm, PackageManagerEnum.Yarn])
                .default(determinePackageManager()),
        )
        .allowUnknownOption()
        .parse();

    // eslint-disable-next-line prefer-const
    let { typescript, javascript, packageManager, install: installPackages } = program.opts();

    if (![PackageManagerEnum.Npm, PackageManagerEnum.Pnpm, PackageManagerEnum.Yarn].includes(packageManager)) {
        console.error(chalk.red(`This utility do not support ${packageManager} as of now`))
        process.exit(1)
    }

    if (!projectDirectory) {
        projectDirectory = (
            await prompts({
                onState: onPromptState,
                type: 'text',
                name: 'directory',
                initial: 'my-whatsapp-bot',
                message: 'What is the name of the directory you want to create this project in?',
                validate: (directory) => {
                    // We'll use the directory name as the project name. Check npm name validity.
                    const validationResult = validateProjectName(directory);

                    if (!validationResult.validForNewPackages) {
                        const errors: string[] = [];

                        for (const error of [...(validationResult.errors ?? []), ...(validationResult.warnings ?? [])]) {
                            errors.push(chalk.red(`- ${error}`));
                        }

                        return chalk.red(
                            `Cannot create a project named ${chalk.yellow(
                                `"${directory}"`,
                            )} due to npm naming restrictions.\n\nErrors:\n${errors.join('\n')}\n\n${chalk.red(
                                '\nSee https://docs.npmjs.com/cli/configuring-npm/package-json for more details.',
                            )}}`,
                        );
                    }

                    return true;
                },
            })
        ).directory;
    }

    const deno = packageManager === 'deno';
    if (!deno && typescript === undefined && javascript === undefined) {
        const { useTypescript } = await prompts({
            onState: onPromptState,
            type: 'toggle',
            name: 'useTypescript',
            message: 'Do you want to use TypeScript?',
            initial: true,
            active: 'Yes',
            inactive: 'No',
        });

        typescript = useTypescript;
    }

    await createWhatsappBot({
        isTypescriptEnabled: typescript,
        directory: projectDirectory,
        doInstallPackage: installPackages,
        packageManagerInUse: packageManager
    })
}



setupProject().catch(error => console.error(error))