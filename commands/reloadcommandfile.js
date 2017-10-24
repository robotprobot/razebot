// This needs to take the requesters userID, search for it in the stats directory and then pull up results.

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
    fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [ PERMS ] - " + '~INSUFFICIENT PERMISSIONS~ Someone attempted to reload a command without correct perms! User: ' + message.author.username + '. (ID: ' + message.author.id + ')');
    return;
  }
  else if (userID == config.ownerID && (!config.loggingEnabled == "TRUE" || !config.loggingPerms == "TRUE")) { // If user is owner and logging is disabled
    if(!args || args.size < 1) return message.reply("Provide a command name to reload...");
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(`The command '${args[0]}' has been reloaded`);
    return;
  }
  else if (userID == config.ownerID && config.loggingEnabled == "TRUE" && config.loggingPerms == "TRUE") { // if user is owner and logging is enabled
    if(!args || args.size < 1) return message.reply("Provide a command name to reload...");
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(`The command '${args[0]}' has been reloaded`);
    fs.appendFile('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [RLCOMND] - " + 'A command reload was completed by user: ' + message.author.username + '. (ID: ' + message.author.id + ')');
    return;
  }
}; // Go back to main.js
