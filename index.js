const Manager = require("./starter/lib/Manager.js");
const Engineer = require("./starter/lib/Engineer.js");
const Intern = require("./starter/lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./starter/src/page-template.js");
const employee = require("./starter/lib/Employee.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.


// GLOBAL VARIABLES ------------------------------------------------------------*

let teamManagerData;
const employees = [];

// GENERAL FUNCTIONS ------------------------------------------------------------*


// Initialise the application --------*

async function startApp() {

    let teamManager = [
        {
            type: 'input',
            name: 'name',
            message: "Please enter the Team Manager's name:",
        },
        {
            type: 'input',
            name: 'id',
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

    teamManagerData = await inquirer.prompt(teamManager);

    // console.log(teamManagerData.id)
};


// Present main menu options --------*

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
                },
                {
                    name:  'Add an intern',
                    value: 'Intern',
                },
                {
                    name: 'Finish building the team',
                    value: 'Finish',
                }
            ],
        },

    ];

    return inquirer.prompt(mainMenu);
};


async function menuSelect() {
    let menu = await buildTeam();

    if (menu.selection === 'Engineer') {
        console.log("Let's add an Engineer:")
        let newEngineer = [
            {
                type: 'input',
                name: 'name',
                message: "Please enter the Engineer's name:",
            },
            {
                type: 'input',
                name: 'id',
                message: "Please enter the Engineers's employee ID:",
            },
            {
                type: 'input',
                name: 'email',
                message: "Please enter the Engineer's email:",
            },
            {
                type: 'input',
                name: 'github',
                message: "Please enter the Engineer's GitHub username:",
            }
        ];

        let addEngineer = await inquirer.prompt(newEngineer);
        await employees.push(addEngineer);
        menuSelect();
        // console.log(employees);
        

    } else if (menu.selection === 'Intern') {
        console.log("Let's add an Intern:")
        let newIntern = [
            {
                type: 'input',
                name: 'name',
                message: "Please enter the Intern's name:",
            },
            {
                type: 'input',
                name: 'id',
                message: "Please enter the Intern's employee ID:",
            },
            {
                type: 'input',
                name: 'email',
                message: "Please enter the Intern's email:",
            },
            {
                type: 'input',
                name: 'school',
                message: "Please enter the Intern's school:",
            }
        ];
    
        let addIntern = await inquirer.prompt(newIntern);
        await employees.push(addIntern);
        menuSelect();

    } else {
        // User is finished building team
        console.log("Your team is complete!");
        console.log(`Congratulations on building your team ${teamManagerData.name}`)
        console.log("Your new team now features...");
        console.log("-----------------------");
        console.log(employees);
        // employees.forEach(employee => {
        //     console.log(employee);
        // });

        // Write to HTML FILE
        renderHTML(employees);
    };
};

// MOVE TO GLOBAL
let renderedTeam;

function renderHTML(employeelist) {
    renderedTeam = render(employeelist);
    // return renderedTeam;
    console.log(renderedTeam);
};

// async function createHTML() {
//     // let content = employees;
//     await fs.writeFile('SampleHTML.html', render, (error) =>
//     error ? console.error(error) : console.log('Success! Your read me has been saved.'))
// }



// Start application --------*

async function main() {
    await startApp();
    await menuSelect();
    // createHTML();
}

main();