# Contribution Guidelines
This document is a living summary of conventions and best practices for development within Whatsapp.js.

  - [SIGN ALL OF YOUR GIT COMMITS](#sign-all-of-your-git-commits)
  - [Understanding the Project Structure](#understanding-the-project-structure)
  - [Pull Requests](#pull-requests)
  - [General Guidelines](#general-guidelines)
  - [Changelog Update Guidelines](#changelog-update-guidelines)
  - [Code Guidelines](#code-guidelines)
  - [File Naming Guidelines](#file-naming-guidelines)
  - [JS Documentation](#js-documentation)

## SIGN ALL OF YOUR GIT COMMITS

Whenever you make a commit, it is required to be signed. If you do not, you will have to re-write the git history to get all commits signed before they can be merged, which can be quite a pain.

Use the "-s" or "--signoff" flags to sign a commit.

Example calls:
* `git commit -s -m "Adding a test file to new_branch"`
* `git commit --signoff -m "Adding a test file to new_branch"`

Why? Sign-off is a line at the end of the commit message which certifies who is the author of the commit. Its main purpose is to improve tracking of who did what, especially with patches.

Example commit in git history:

```
Add tests for the payment processor.

Signed-off-by: Humpty Dumpty <humpty.dumpty@example.com>
```

What to do if you forget to sign off on a commit?

To sign old commits: `git rebase --exec 'git commit --amend --no-edit --signoff' -i <commit-hash>`

where commit hash is one before your first commit in history

If you forget to signoff on a commit, you'll likely receive the following message:

"Commit message must be signed off with your user name and email.
To sign off your commit, add the -s flag to the git commit command."

## Understanding the Project Structure


## Pull Requests

Consider the following when you interact with pull requests:

- Pull request reviewers should be assigned to a same-team member.
- Pull requests should remain open for at least 24 hours, or until close of business next business day (accounting for weekends and holidays).
- Anyone can comment on a pull request to request delay on merging or to get questions answered.

## General Guidelines

The following list describes general conventions for contributing to Whatsapp.js :

- Communicate frequently (before pull request) with cross-team member representatives (in informal & small meetings) for new design features.
- Require/import dependencies at the top of a file to identify load failures/missing files as soon as possible.
- Before implementing new functionality, evaluate if existing packages already achieve intended functionality.
- Throw WhatsappError (or perhaps a wrapping of these) instead of throwing Error objects for automatic logging and node-report captures.
- Provide adequate logging to diagnose problems that happen at external customer sites.
- Keep "packages" small and independent without cross dependencies
  - When a package is dependent on another package, import the through the dependent package's interface (`index.ts`)
  e.g. `packages/zosjobs/src/GetJobs.ts` will import the `rest` package via:
    ```typescript
       import { WhatsappError } from "./src/error";
    ```
      NOT via:
    ```typescript
    import { ZosmfRestClient } from   "./src/error/error.ts";
     ```
- Make classes small, logical pieces

## Changelog Update Guidelines

Add an entry to changelog.md for any PR that introduces a feature, enhancement, or fix that affects end users. Changes to certain files, such as the Jenkinsfile, do not require a changelog update. The changelogs are compiled into Zowe Docs [Release Notes](https://docs.zowe.org/stable/getting-started/summaryofchanges.html) periodically.

**Each changelog entry must:**
- Describe the change and how it impacts end users.
- Include a relevant Issue # or Pull Request #.

The following is an example of the markdown that you should insert into the changelog above the last-released version:

```
## Recent Changes

- Document your changes here. [Issue# or PR#](link-to-issue-or-pr)
- Document another change here. [Issue# or PR#](link-to-issue-or-pr)
```

**Tips:**
- Start the sentence with a verb in past tense. For example "Added...", "Improved...", "Enhanced...".
- Write from a user's perspective. Document why the change matters to the end user (what this feature allows them to do now). For example, "Added the validate-only mode of Zowe. This lets you check whether all the component validation checks of the Zowe installation pass without starting any of the components.".
- Use second person "you" instead of "users".

## Code Guidelines

Indent code with 4 spaces. This is also documented via `.editorconfig`, which can be used to automatically format the code if you use an [EditorConfig](https://editorconfig.org/) extension for your editor of choice.

Lint rules are enforced through our [build process](#build-process-guidelines).

## File Naming Guidelines

The following list describes the conventions for naming the source files:

- Class names should match file names (e.g. `class WhatsappError` would be found in a file `WhatsappError.ts`).
- Interface names should match file names and and file names of interfaces should start with the capital letter `I`, (e.g. `interface Client` would be found in `IClient.ts`).
- Interfaces should be separate files and should be in a `doc` folder (e.g. `./doc/IClient.ts`).

 ### JS Documentation

- Use jsdoc annotations - [document this](https://marketplace.visualstudio.com/items?itemName=joelday.docthis) makes extensive use of jsdoc tags.
  - Common tags to use, `@static`, `@memberof`, `@returns`, `@params`, `@class`, `@exports`, `@interface`, `@types`, `@throws`, `@link`
- [tsdoc](https://typedoc.org/) is used to generate html documentation