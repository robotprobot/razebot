// This needs to take the requesters userID, search for it in the stats directory and then pull up results.

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json

exports.run = (client, message, args) => {
  var userID = message.author.id; // Get userID
  const userFile = require(`../stats/${userID}.json`); // Find the file that matches the userID

  var embed = new Discord.RichEmbed() // Prepare an embed
    .setTitle("Stats for " + message.author.username)
    .setColor(0x00AE86)
    .setTimestamp()
    .addField("Points", userFile.points, true) // Fill in the areas with the correct numbers
    .addField("Wins", userFile.wins, true)
    .addField("Losses", userFile.losses, true)
    .addField("Level", userFile.level, true)
    message.channel.send({embed}); // Send embed
} // Go back to main.js
