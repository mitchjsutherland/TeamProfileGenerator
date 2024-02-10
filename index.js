const Manager = require("./starter/lib/Manager.js");
const Engineer = require("./starter/lib/Engineer.js");
const Intern = require("./starter/lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./starter/src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const employees = [];


// Initialise the application ---------------------------------*

function startApp() {

    let teamManager = [
        {
            type: 'input',
            name: 'name',
            message: "Please enter the Team Manager's name:",
        },
        {
            type: 'input',
            name: 'ID',
            message: "Please enter the Team Manager's employee ID:",
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the Team Manager's email:",
        },
        {
            type: 'input',
            name: 'office',
            message: "Please enter the Team Manager's office number",
        }
    ];

    return inquirer.prompt(teamManager);
};

// Present main menu options ---------------------------------*

function buildTeam() {

    let mainMenu = [
        {
            type: 'list',
            name: 'selection',
            message: "What would you like to do?",
            choices: [
                {
                    name: 'Add an engineer', 
                    value: 'Engineer',
                    // short:
                },
                {
                    name:  'Add an intern',
                    value: 'Intern',
                    // short:
                },
                {
                    name: 'Finish building the team',
                    value: 'Finish',
                    // short:
                }
            ],
        },

    ];

    return inquirer.prompt(mainMenu);
};


// async function showSelection() {
//     let selection = await buildTeam();
//     console.log(selection);
// }

// showSelection();


async function menuSelect() {
    let menu = await buildTeam();

    if (menu.selection === 'Engineer') {
        console.log("Let's add an Engineer:")

    } else if (menu.selection === 'Intern') {
        console.log("Let's add an Intern:")

    } else {
        // User is finished building team
        console.log("Your team is complete!")
    };
};


async function main() {
    await startApp();
    menuSelect();
}

main();