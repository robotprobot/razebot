// This will be a command that can only be run by the ownerID. It would force level up the user (for testing purposes)

const Discord = require("discord.js"); // Require Discord.js for app to run
const config = require("../config.json"); // Require access to the config.json
const fs = require("fs"); // Allow filesystem read and write

exports.run = (client, message, args) => {
  var userID = message.author.id; // Get userID
  const userFile = require(`../stats/${userID}.json`); // Find the file that matches the userID

  if (userID !== config.ownerID && (!config.loggingEnabled == "TRUE" || !config.loggingPerms == "TRUE")) { // If user is not owner AND logging is disabled
    message.channel.send("Insufficient permissions");
    return;
  }

  else if (userID !== config.ownerID && config.loggingEnabled == "TRUE" && config.loggingPerms == "TRUE") { // If user is not owner AND logging is enabled
    message.channel.send("Insufficient permissions -- This incident has been logged.");
    fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [ PERMS ] - " + '~INSUFFICIENT PERMISSIONS~ Someone attempted to force level up without correct perms! User: ' + message.author.username + '. (ID: ' + message.author.id + ')');
    return;
  }

  else if (userID == config.ownerID && (!config.loggingEnabled == "TRUE" || !config.loggingPerms == "TRUE")) { // If user is owner and logging is disabled
    userFile.points = +25; // Add 25 points
    userFile.level = +1; // Increase level by 1 (which is 25 points)
    fs.writeFile(file, function (err) {
      if (err) {
        console.log("An error occured when force levelling up. Likely could not update file.");
        message.channel.send("An error has occured. See console for details.");
      }
      else {
        console.log("Force level up was used and completed successfully.");
        message.channel.send("Force level up complete. New level is: " + userFile.level);
      }
    });
    return;
  }

  else if (userID == config.ownerID && config.loggingEnabled == "TRUE" && config.loggingPerms == "TRUE") { // if user is owner and logging is enabled
    userFile.points = +25; // Add 25 points
    userFile.level = +1; // Increase level by 1 (which is 25 points)
    fs.writeFile(file, function (err) {
      if (err) {
        console.log("An error occured when force levelling up. Likely could not update file.");
        message.channel.send("An error has occured. See console for details.");
        fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [FRCELVL] - " + 'Force level was failed on user: ' + message.author.username + '. (ID: ' + message.author.id + ')');
      }
      else {
        console.log("Force level up was used and completed successfully.");
        message.channel.send("Force level up complete. New level is: " + userFile.level);
        fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [FRCELVL] - " + 'Force level was completed on user: ' + message.author.username + '. (ID: ' + message.author.id + ')');
      }
    });
    return;
  };

}; // Go back to main.js
