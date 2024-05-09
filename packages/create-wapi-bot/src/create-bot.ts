import type { ExecException } from "node:child_process";
import {
  cp,
  stat,
  mkdir,
  readdir,
  readFile,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { URL } from "node:url";
import glob from "fast-glob";
import chalk from "chalk";
import { installPackages } from "./reusable-function";
import { PackageManagerEnum } from "./type.js";

export async function createWhatsappBot(options: {
  directory: string;
  doInstallPackage: boolean;
  packageManagerInUse: PackageManagerEnum;
  isTypescriptEnabled: boolean;
}) {
  const {
    directory,
    doInstallPackage,
    isTypescriptEnabled,
    packageManagerInUse,
  } = options;

  const root = path.resolve(directory);
  const directoryName = path.basename(root);

  const directoryStats = await stat(root).catch(async (error) => {
    // Create a new directory if the specified one does not exist.
    if (error.code === "ENOENT") {
      await mkdir(root, { recursive: true });
      return stat(root);
    }

    throw error;
  });

  // If the directory is actually a file or if it's not empty, throw an error.
  if (!directoryStats.isDirectory() || (await readdir(root)).length > 0) {
    console.error(
      chalk.red(
        `The directory ${chalk.yellow(
          `"${directoryName}"`,
        )} is either not a directory or is not empty.`,
      ),
    );
    console.error(chalk.red(`Please specify an empty directory.`));
    process.exit(1);
  }

  console.log(`Creating ${directoryName} in ${chalk.green(root)}.`);
  const deno = packageManagerInUse === PackageManagerEnum.Deno;
  await cp(
    new URL(
      `../template/${
        deno ? "Deno" : isTypescriptEnabled ? "typeScript" : "javaScript"
      }`,
      import.meta.url,
    ),
    root,
    {
      recursive: true,
    },
  );

  const bun = packageManagerInUse === PackageManagerEnum.Bun;
  if (bun) {
    await cp(
      new URL(
        `../template/Bun/${
          isTypescriptEnabled ? "typeScript" : "javaScript"
        }/package.json`,
        import.meta.url,
      ),
      `${root}/package.json`,
    );

    if (isTypescriptEnabled) {
      await cp(
        new URL(
          "../template/Bun/TypeScript/tsconfig.eslint.json",
          import.meta.url,
        ),
        `${root}/tsconfig.eslint.json`,
      );
      await cp(
        new URL("../template/Bun/TypeScript/tsconfig.json", import.meta.url),
        `${root}/tsconfig.json`,
      );
    }
  }

  process.chdir(root);

  const globStream = glob.stream("./src/**/*.ts");
  for await (const file of globStream) {
    const newData = await readFile(file, { encoding: "utf8" }).then((str) =>
      str.replaceAll("[REPLACE_IMPORT_EXT]", isTypescriptEnabled ? "ts" : "js"),
    );
    await writeFile(file, newData);
  }

  if (!deno) {
    const newPackageJSON = await readFile("./package.json", {
      encoding: "utf8",
    }).then((str) => {
      let newStr = str.replace("[REPLACE_ME]", directoryName);
      newStr = newStr.replaceAll(
        "[REPLACE_IMPORT_EXT]",
        isTypescriptEnabled ? "ts" : "js",
      );
      return newStr;
    });
    await writeFile("./package.json", newPackageJSON);
  }

  if (doInstallPackage) {
    try {
      installPackages(packageManagerInUse);
    } catch (error) {
      console.log();
      const err = error as ExecException;
      if (err.signal === "SIGINT") {
        console.log(chalk.red("Installation aborted."));
      } else {
        console.error(chalk.red("Installation failed."));
        process.exit(1);
      }
    }
  }

  console.log();
  console.log(
    chalk.green(
      `Setup done!! You can visit the documentation here https://wapijs.co, to smoothly build your bot.`,
    ),
  );
}
