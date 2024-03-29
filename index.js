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
    addManager = new Manager(teamManagerData.name, teamManagerData.id, teamManagerData.email, teamManagerData.office);
    await employees.push(addManager);

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

        let engineerData = await inquirer.prompt(newEngineer);
        let addEngineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
        await employees.push(addEngineer);
        menuSelect();
    

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
    
        let internData = await inquirer.prompt(newIntern);
        let addIntern = new Intern(internData.name, internData.id, internData.email, internData.school);
        await employees.push(addIntern);
        menuSelect();

    } else {
        // User is finished building team
        console.log("Your team is complete!");
        console.log(`Congratulations on building your team ${teamManagerData.name}`)
        console.log("Your new team now features...");
        console.log("-----------------------");
        // console.log(employees);
        employees.forEach(employee => {
            console.log(employee.name);
        });

        // Write to HTML FILE
        writeHTML(render(employees));
    };
};


// function renderHTML(stafflist) {

//     // let teamOutput = render(stafflist);
//     // return teamOutput;
//     // console.log(teamOutput);
// };

// function createHTML() {
//     fs.writeFileSync(outputPath, teamOutput, (error) =>
//     error ? console.error(error) : console.log('Success! Your team is now viewable.'))
// }


function writeHTML(html) {
    if(fs.existsSync(OUTPUT_DIR)) {
        fs.writeFileSync(outputPath, html)
    } else {
        fs.mkdirSync(OUTPUT_DIR);
        fs.writeFileSync(outputPath, html)
    }
};

// Start application --------*

async function main() {
    await startApp();
    await menuSelect();
};

main();