// This needs to check that the requester has permission to do this command, then delete the current log and generate a new one.

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json
const fs = require("fs"); // Allow filesystem read and write
var logPath = './log.txt';

exports.run = (client, message, args) => {
  var userID = message.author.id; // Get userID

    if (userID !== config.ownerID && (!config.loggingEnabled == "TRUE" || !config.loggingPerms == "TRUE")) { // If user is not owner AND logging is disabled
      message.channel.send("Insufficient permissions");
      return;
    }

    else if (userID !== config.ownerID && config.loggingEnabled == "TRUE" && config.loggingPerms == "TRUE") { // If user is not owner AND logging is enabled
      message.channel.send("Insufficient permissions -- this incident has been logged.");
      fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [ PERMS ] - " + '~INSUFFICIENT PERMISSIONS~ Someone attempted to clean the log file without correct perms! User: ' + message.author.username + '. (ID: ' + message.author.id + ')');
      return;
    }

    else if (userID == config.ownerID && (!config.loggingEnabled == "TRUE" || !config.loggingPerms == "TRUE")) { // If user is owner and logging is disabled
      if (args == config.remoteLogDeletePassword) {
        message.delete(1);
        fs.unlinkSync(logPath);
        console.log('Log file deleted');
        message.channel.send('Log file was sucessfully removed, generating new...');
        console.log('Generating new log file...');
        message.channel.send('Log clearup completed.');
        var stream = fs.createWriteStream('./log.txt');
        stream.once('open', function(fd) { // Open the file to write to it
          stream.write('Log generated on ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -- You can modify what actions are logged, or turn off logging completely in config.json");
          stream.end(); // Close the file and save
          });
        }
      else {
        message.channel.send("Please also enter the Remote Log Clear Password.")
        return;
      }
    }

    else if (userID == config.ownerID && config.loggingEnabled == "TRUE" && config.loggingPerms == "TRUE") { // if user is owner and logging is enabled
      if (args == config.remoteLogDeletePassword) {
        message.delete(1);
        fs.unlinkSync(logPath);
        console.log('Log file deleted');
        message.channel.send('Log file was sucessfully removed, generating new...');
        console.log('Generating new log file...');
        message.channel.send('Log clearup completed.');
        var stream = fs.createWriteStream('./log.txt');
        stream.once('open', function(fd) { // Open the file to write to it
          stream.write('Log generated on ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -- You can modify what actions are logged, or turn off logging completely in config.json");
          stream.end(); // Close the file and save
        });
        setTimeout(function() {
          fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [LOGCLND] - " + 'Log was cleaned by ' + message.author.username + '. (ID: ' + message.author.id + ')');
          }, 1000);
        return;
      }
    else {
      message.channel.send("Please also enter the Remote Log Clear Password.")
      return;
    }
  }
}; // Go back to main.js
