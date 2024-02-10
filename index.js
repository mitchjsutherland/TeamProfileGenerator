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

// Use inquirer format

// function startApp() {

//     let teamManagerInfo = [
//         {
//             type: 'input',
//             name: 'name',
//             message: "Enter your Team Manager's name:",
//         },
//         {
//             type: 'input',
//             name: 'ID',
//             message: "Enter your Team Manager's employee ID:",
//         },
//         {
//             type: 'input',
//             name: 'email',
//             message: "Enter your Team Manager's email:",
//         },
//         {
//             type: 'input',
//             name: 'office',
//             message: "Enter your Team Manager's office number",
//         }
//     ];

//     // return inquirer.prompt(teamManagerInfo);
// };


function buildTeam() {

    let mainMenu = [
        {
            type: 'list',
            name: 'menu',
            message: "What would you like to do?",
            choices: [
                {
                    name: 'Add an engineer', 
                    value: 'New engineer',
                    // short:
                },
                {
                    name:  'Add an intern',
                    value: 'New engineer',
                    // short:
                },
                {
                    name: 'Finish building the team',
                    value: 'Team complete',
                    // short:
                }
            ],
        },

    ];

    return inquirer.prompt(mainMenu);
};


async function showSelection() {
    let selection = await buildTeam();
    console.log(selection);
}


showSelection();

