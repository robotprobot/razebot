// This needs to check that the request is in the secure channel, and the requester has permission to do this command.
// It will then need to message back with either 'Unavailable in this channel', 'Insufficient permissions', or the log file to download.

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json
const fs = require("fs"); // Allow filesystem read and write
var logPath = './log.txt';

exports.run = (client, message, args) => {
  var userID = message.author.id; // Get userID
  var channelID = message.channel.id; // Get the ID of the channel where message was sent
  var logStats = fs.statSync(logPath);
  var fileSizeInBytes = logStats.size;

  if (config.logDownloadingAllowed == "TRUE") {
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
        if (fileSizeInBytes <= 8388608) { // if file is below discord file size limit, then proceed.
          message.channel.send(message.author.username + ' exported the log at ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), {
            files: [
              logPath
            ]
          });
        }
        else if (fileSizeInBytes > 8388608) {
          message.channel.send("Log file has grew above the file size limit (8mb) on Discord. Cannot export. Recommend clearing log with the clearlogfile command.");
        }
      }

      else if (userID == config.ownerID && config.loggingEnabled == "TRUE" && config.loggingPerms == "TRUE") { // if user is owner and logging is enabled
        if (fileSizeInBytes <= 8388608) { // if file is below discord file size limit, then proceed.
          message.channel.send(message.author.username + ' exported the log at ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), {
            files: [
              logPath
            ]
          });
        }
        else if (fileSizeInBytes > 8388608) {
          message.channel.send("Log file has grew above the file size limit (8mb) on Discord. Cannot export. Recommend clearing log with the clearlogfile command.");
        }
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
  }
  else {
    message.channel.send("Remote log downloading is disabled.");
  }
}; // Go back to main.js
