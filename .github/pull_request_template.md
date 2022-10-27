name: pull request
description: Create a pull request
title: "[PULL REQUEST] <pull request details>"
labels: [enhancement]
body:
  - type: textarea
    id: description
    attributes:
      label: Description of the changes, you have made.(Mention the issue number, it solves.)
    validations:
      required: true
  - type: textarea
    id: workingenvironment
    attributes:
      label: Mention if the changes are for any specific Working Environment (e.g. operating system, browser, device, N/A) 
    validations:
      required: true
  - type: textarea
    id: screenshots
    attributes:
      label: Please add some pictorial references to these changes, if applicable (Drag & Drop your ss below)
    validations:
      required: false
  - type: textarea
    id: solution
    attributes:
      label: Does your code changes make any other feature broke? (If Yes, State reason)
    validations:
      required: true
  - type: textarea
    id: context
    attributes:
      label: Any other context or any note for reviewer, to add here regarding this change.
    validations:
      required: false