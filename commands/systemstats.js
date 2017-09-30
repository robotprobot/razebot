// This will show statistics about the bot

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json

exports.run = (client, message, args) => {
  message.channel.send("Amount of unrecognised commands used: " + unrecognisedCommands);


}; // Go back to main.js
