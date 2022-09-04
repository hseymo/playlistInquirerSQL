const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const { start } = require("repl");
const { finished } = require("stream");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log("Connected to playlist database.")
);

function begin() {
  console.log("Welcome!");
  menu();
}

begin();

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What do you want to do?",
        choices: ["Add a song", "View all songs", "Quit"],
      },
    ])
    .then((answers) => {
      switch (answers.menu) {
        case "Add a song":
          addASong();
          break;
        case "View all songs":
          viewAllSongs();
          break;
        default:
          console.log("Goodbye!");
          break;
      }
    });
}

addASong = async () => {
  try {
    console.log("chose to add a song");
    menu();
  } catch (err) {
    console.log(err);
  }
};

viewAllSongs = async () => {
  try {
    console.log("chose to view all songs");
    menu();
  } catch (err) {
    console.log(err);
  }
};
