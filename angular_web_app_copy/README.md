# MaterialPoc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Project Requirements:

Latest version of node

Latest version of npm

## Getting Started

1. create a new folder;
2. "cd" to that folder from your terminal;
3. run `git clone http://pms-sc.ril.com/HR_Platform_3.0/angular_web_app.git`;
4. run `npm install`;

Step 4 should install all dependencies for the project in their desired versions, inlcuding angular and angular-cli.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Project specific build command - `npm run aot` [See package.json for more information]

## Branching Guidelines

The stable branch is the one which is supposed to be referred to & deployed and will contain stable code.

For development purposes, `stable_dev` has been created. Every team will checkout a new feature branch from `stable_dev`. Sub-feature branches can be checked out from this level and worked upon.

Branches are to be created for features and sub-features only and named accordingly.

After successful code review, individual branches can be merged into the feature branch, take a pull from stable_dev and run a QA on your local server.

On successful testing, create a merge request from your feature branch onto stable_dev.

Naming conventions to be followed: Feature branch - `ft_<feature_name>` ; Sub-feature branch - `sft_<feature_name>_<sub_feature_name>`

## Merge Request Guidelines

All requests should be peer reviewed by either your team member or anyone else on the project.

Always run a local successful `npm run aot` build command before raising any merge request.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get help on Material design, please refer to https://material.angular.io/
