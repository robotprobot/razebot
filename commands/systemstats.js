// This will show statistics about the bot

const Discord = require("discord.js"); // Require Discord.js for app to run
const main = require("../main.js"); // Allowing access to main.js for variable access
const config = require("../config.json"); // Require access to the config.json

exports.run = (client, message, args) => {
  message.channel.send("Amount of unrecognised commands used: " + main.unrecognisedCommands);


}; // Go back to main.js
