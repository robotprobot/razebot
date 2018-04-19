// This will be a command that can only be run by the ownerID. It would force level up the user (for testing purposes)

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json
const fs = require("fs"); // Allow filesystem read and write
const sql = require("sqlite"); // SQL Database, requires the sqlite module

exports.run = (client, message, args) => {
  var userID = message.author.id; // Get userID

  if (userID !== config.ownerID && (!config.loggingEnabled == "TRUE" || !config.loggingPerms == "TRUE")) { // If user is not owner AND logging is disabled
    message.channel.send("Insufficient permissions");
    return;
  }

  else if (userID !== config.ownerID && config.loggingEnabled == "TRUE" && config.loggingPerms == "TRUE") { // If user is not owner AND logging is enabled
    message.channel.send("Insufficient permissions -- this incident has been logged.");
    fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [ PERMS ] - " + '~INSUFFICIENT PERMISSIONS~ Someone attempted to force level down without correct perms! User: ' + message.author.username + '. (ID: ' + message.author.id + ')');
    return;
  }

  else if (userID == config.ownerID && (!config.loggingEnabled == "TRUE" || !config.loggingPerms == "TRUE")) { // If user is owner and logging is disabled
    sql.get(`SELECT * FROM stats WHERE userId ="${message.author.id}"`).then(row => {
      sql.run(`UPDATE stats SET points = ${row.points - 25} WHERE userId = ${message.author.id}`);
      sql.run(`UPDATE stats SET level = ${row.level - 1} WHERE userId = ${message.author.id}`);
     }).catch(() => {
     });
     setTimeout(function() {
      console.log("Force level down was used and completed successfully.");
      message.channel.send("Force level down complete.");
      fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [FRCELVL] - " + 'Force level down was completed on user: ' + message.author.username + '. (ID: ' + message.author.id + ')');
      }, 1000);
      return;
  }

  else if (userID == config.ownerID && config.loggingEnabled == "TRUE" && config.loggingPerms == "TRUE") { // if user is owner and logging is enabled
    sql.get(`SELECT * FROM stats WHERE userId ="${message.author.id}"`).then(row => {
      sql.run(`UPDATE stats SET points = ${row.points - 25} WHERE userId = ${message.author.id}`);
      sql.run(`UPDATE stats SET level = ${row.level - 1} WHERE userId = ${message.author.id}`);
     }).catch(() => {
     });
     setTimeout(function() {
      console.log("Force level down was used and completed successfully.");
      message.channel.send("Force level down complete.");
      fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [FRCELVL] - " + 'Force level down was completed on user: ' + message.author.username + '. (ID: ' + message.author.id + ')');
      }, 1000);
      return;
  };
}; // Go back to main.js
