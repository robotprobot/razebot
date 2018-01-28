exports.run = (member) => {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = global.client; // Prepare a client for the bot
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot
     const sql = require("sqlite"); // SQL Database, requires the sqlite module

     sql.get(`SELECT * FROM stats WHERE userId = "${member.id}"`).then(row => {
       if (!row) {
         console.log("New client detected. Adding entry to database...");
         sql.run("INSERT INTO stats (userId, points, wins, losses, level) VALUES (?, ?, ?, ?, ?)", [member.id, 0, 0, 0, 0]);
       }
     });
   }
};
