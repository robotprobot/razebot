exports.run = (message) => {
  const Discord = require("discord.js"); // Require Discord.js for app to run
  const client = global.client; // Prepare a client for the bot
  const talkedRecently = global.talkedRecently; // Set for cooldown username storage
  const fs = require("fs"); // Prepare file reading
  const config = require("../config.json"); // Require the config file for the bot
  const sql = require("sqlite"); // SQL Database, requires the sqlite module

  if (!message.guild) return; // If message is not in server (like a dm), reject
  if (message.author.bot) return; // If the message the bot wants to respond to is from itself, reject to prevent loops
  if (!message.content.startsWith(config.prefix)) return; // If the message does not contain the prefix, reject
  if (talkedRecently.has(message.author.id)) {
    message.reply("You are currently on cooldown! Please wait 2.5 seconds before sending another command.");
    return;
  };

  // Adds the user to the set so that they can't talk for 2.5 seconds
  talkedRecently.add(message.author.id);
  console.log(message.author.username + " (ID: " + message.author.id + ") is now on cooldown for 2.5 seconds.");
  setTimeout(() => {
  // Removes the user from the set after 2.5 seconds
   talkedRecently.delete(message.author.id);
  }, 2500);

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g); // If message accepted, remove prefix
  const command = args.shift().toLowerCase(); // Change resulting message to lowercase

  try {
   let commandFile = require(`../commands/${command}.js`); // Search for a corrosponding command
   commandFile.run(client, message, args); // If command exists, run it
   console.log('Command "' + command + '" was found successfully and used by ' + message.author.username + '. (ID: ' + message.author.id + ')');
   if (config.loggingEnabled == "TRUE" && config.loggingCommand == "TRUE") {
     fs.appendFileSync('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -   - [COMMAND] - " + 'Command "' + command + '" was found successfully and used by ' + message.author.username + '. (ID: ' + message.author.id + ')');
   };
   return;
   } catch (err) { // Else tell user that command was not found
   if (config.consoleDebuggingEnabled == "TRUE") {
     console.error(err); // IF THERE IS A FAILURE, THIS WILL DUMP IT TO CONSOLE!
   };
   console.log('Command "' + command + '" was not found, requested by ' + message.author.username + '. (ID: ' + message.author.id + ')');
   message.channel.send("Command not recognised");
   if (config.loggingEnabled == "TRUE" && config.loggingCommand == "TRUE") {
     fs.appendFileSync('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -   - [COMMAND] - " + 'Command "' + command + '" was not found, requested by ' + message.author.username + '. (ID: ' + message.author.id + ')');
   };
   return;
  }
};