import { execSync } from 'node:child_process'
import process from 'node:process'
import { PackageManagerEnum } from './type.js'

export function determinePackageManager(): PackageManagerEnum {
	const npmConfigUserAgent = process.env.npm_config_user_agent

	if (npmConfigUserAgent) {
		if (npmConfigUserAgent.includes('npm')) {
			return PackageManagerEnum.Npm
		} else if (npmConfigUserAgent.includes('yarn')) {
			return PackageManagerEnum.Yarn
		} else if (npmConfigUserAgent.includes('pnpm')) {
			return PackageManagerEnum.Pnpm
		} else if (npmConfigUserAgent.includes('bun')) {
			return PackageManagerEnum.Bun
		} else {
			return PackageManagerEnum.Npm
		}
	} else {
		return PackageManagerEnum.Npm
	}
}

export function installPackages(packageManager: PackageManagerEnum) {
	let installCommand: string[] | string = `${packageManager} install`

	console.log(`Installing dependencies with ${packageManager}...`)

	switch (packageManager) {
		case 'yarn':
			console.log()
			installCommand = [
				`${packageManager} set version stable`,
				`${packageManager} config set nodeLinker node-modules`,
				`${packageManager} config set logFilters --json '[{ "code": "YN0002", "level": "discard" }, { "code": "YN0013", "level": "discard" }, { "code": "YN0032", "level": "discard" }, { "code": "YN0060", "level": "discard" }]'`,
				`${packageManager} plugin import interactive-tools`,
				`${packageManager} plugin import workspace-tools`,
				installCommand
			]
			break
		case 'deno':
			installCommand = `${packageManager} cache --reload src/index.ts`
			break
		case 'pnpm':
		case 'bun':
			console.log()
			break
		default:
			break
	}

	const env = {
		...process.env,
		ADBLOCK: '1',
		NODE_ENV: 'development',
		DISABLE_OPENCOLLECTIVE: '1'
	}

	if (Array.isArray(installCommand)) {
		for (const [index, command] of installCommand.entries()) {
			if (index === installCommand.length - 1) {
				execSync(command, {
					stdio: 'inherit',
					env
				})

				break
			}

			execSync(command, {
				stdio: 'ignore',
				env
			})
		}

		return
	}

	execSync(installCommand, {
		stdio: 'inherit',
		env
	})
}
