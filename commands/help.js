// This needs to output a list of available commands to the user.

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json
const commandsFolder = ("./commands/"); // Tells where the commands folder is to read for this list
const fs = require("fs"); // Allow filesystem read and write

exports.run = (client, message, args) => {
  fs.readdirSync(commandsFolder).forEach(file => {
    console.log(file);
  });
}; // Go back to main.js
