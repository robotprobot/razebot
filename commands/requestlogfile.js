// This needs to send a message containing the ping when requested.

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json
const fs = require("fs"); // Allow filesystem read and write

exports.run = (client, message, args) => {
  var userID = message.author.id; // Get userID
  var channelID = message.channel.id; // Get the ID of the channel where message was sent

  if (channelID == config.administrationTextRoomID) {
    if (userID !== config.ownerID && (!config.loggingEnabled == "TRUE" || !config.loggingPerms == "TRUE")) { // If user is not owner AND logging is disabled
      message.channel.send("Insufficient permissions");
      return;
    }

    else if (userID !== config.ownerID && config.loggingEnabled == "TRUE" && config.loggingPerms == "TRUE") { // If user is not owner AND logging is enabled
      message.channel.send("Insufficient permissions -- this incident has been logged.");
      fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [ PERMS ] - " + '~INSUFFICIENT PERMISSIONS~ Someone attempted to export the log file without correct perms! User: ' + message.author.username + '. (ID: ' + message.author.id + ')');
      return;
    }

    else if (userID == config.ownerID && (!config.loggingEnabled == "TRUE" || !config.loggingPerms == "TRUE")) { // If user is owner and logging is disabled
      message.channel.send(message.author.username + ' exported the log at ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), {
        files: [
          './log.txt'
        ]
      });
    }

    else if (userID == config.ownerID && config.loggingEnabled == "TRUE" && config.loggingPerms == "TRUE") { // if user is owner and logging is enabled
      message.channel.send(message.author.username + ' exported the log at ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), {
        files: [
          './log.txt'
        ]
      });
      setTimeout(function() {
        fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [LOGEXPT] - " + 'Log was exported by ' + message.author.username + '. (ID: ' + message.author.id + ')');
        }, 1000);
      return;
    };
  }
  else if (channelID !== config.administrationTextRoomID && userID == config.ownerID) {
    message.channel.send("Log file cannot be retrieved in this channel");
  }
  else if (channelID !== config.administrationTextRoomID && userID !== config.ownerID) {
    if (userID !== config.ownerID && (!config.loggingEnabled == "TRUE" || !config.loggingPerms == "TRUE")) { // If user is not owner AND logging is disabled
      message.channel.send("Insufficient permissions");
      return;
    }

    else if (userID !== config.ownerID && config.loggingEnabled == "TRUE" && config.loggingPerms == "TRUE") { // If user is not owner AND logging is enabled
      message.channel.send("Insufficient permissions -- this incident has been logged.");
      fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [ PERMS ] - " + '~INSUFFICIENT PERMISSIONS~ Someone attempted to export the log file without correct perms! User: ' + message.author.username + '. (ID: ' + message.author.id + ')');
      return;
    }
  }
}; // Go back to main.js
