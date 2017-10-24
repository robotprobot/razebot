// This needs to take the requesters userID, search for it in the stats directory and then pull up results.

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json
const fs = require("fs"); // Allow filesystem read and write
const sql = require("sqlite"); // SQL Database, requires the sqlite module

exports.run = (client, message, args) => {
  var userID = message.author.id; // Get userID
  sql.get(`SELECT * FROM stats WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) return message.reply("Database entry not found, please leave and rejoin the server. If this error still occurs, please contact an admin.");
    else {
      var embed = new Discord.RichEmbed() // Prepare an embed
        .setTitle("Stats for " + message.author.username)
        .setColor(0x00AE86)
        .setTimestamp()
        .addField("Points", row.points, true) // Fill in the areas with the correct numbers
        .addField("Wins", row.wins, true)
        .addField("Losses", row.losses, true)
        .addField("Level", row.level, true);
      message.channel.send({embed}); // Send embed
    }
  });
  return;
}; // Go back to main.js
