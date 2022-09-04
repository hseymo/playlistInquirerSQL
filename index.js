const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
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
    console.log("You chose to add a song.");
    inquirer.prompt([
      {
        type: "input",
        name: "song_name",
        message: "What is the name of the song?",
        validate: (ans) => {
            if (ans.trim() !== ''){
                return true
            } 
            return 'Please enter the song name'
        }
      },
      {
        type: "input",
        name: "artist",
        message: "Who is the artist?",
        validate: (ans) => {
            if (ans.trim() !== ''){
                return true
            } 
            return 'Please enter the artist'
        }
      },
      {
        type: "input",
        name: "genre",
        message: "What is the genre?",
        validate: (ans) => {
            if (ans.trim() !== ''){
                return true
            } 
            return 'Please enter the genre'
        }
      },
      {
        type: "input",
        name: "user_name",
        message: "What is your name?",
        validate: (ans) => {
            if (ans.trim() !== ''){
                return true
            } 
            return 'Please enter your name'
        }
      },
    ]).then(answers => {
        db.query(`SELECT song_name FROM song`, function (error, results) {
            if (error) {
                throw error
            } else {
                let match = results.filter(result => result.song_name.toLowerCase() == answers.song_name.toLowerCase())
                if (match.length != 0) {
                    console.log('Song already exists!');
                    return menu();
                } else {
                    let song = answers.song_name.trim();
                    let artist = answers.artist.trim();
                    let genre  = answers.genre.trim();
                    let user = answers.user_name.trim();

                    // TODO: Add in user association if user exists or create new user 
                    console.log(`Song: ${song}, Artist: ${artist}, Genre: ${genre}, User: ${user}`)
                    db.query(`INSERT INTO song (song_name, artist, genre) VALUES (?, ?)`, [song, artist, genre], function (err, results) {
                        if (err) {
                            throw err
                        } else {
                            console.log(`Success! ${answers.song_name.trim()} was added!`);
                            return menu();
                        }
                    })
                }
            }
        })
    })
  } catch (err) {
    console.log(err);
  }
};

viewAllSongs = async () => {
  try {
    console.log("You chose to view all songs.");
    db.query(
      `SELECT 
        song_name as 'song', 
        artist, 
        genre, 
        user.name as 'picked by' 
        FROM song 
        LEFT JOIN user 
        ON song.user_id = user.id`,
      function (err, results) {
        if (err) {
          throw err;
        } else {
          const table = cTable.getTable(results);
          console.log(table);
          return menu();
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
