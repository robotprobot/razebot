module.exports = {
   serverConnectionJoin: function() {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = global.client; // Prepare a client for the bot
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot

     if (config.loggingEnabled == "TRUE" && config.loggingConnect == "TRUE") {
       fs.appendFileSync('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [CONNECT] - " + 'Joined server joined: ' + guild.name + ' (id: '+ guild.id + '). This guild has ' + guild.memberCount + ' members!');
     };
   }
}
module.exports = {
   serverConnectionLeave: function() {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = global.client; // Prepare a client for the bot
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot

     if (config.loggingEnabled == "TRUE" && config.loggingConnect == "TRUE") {
        fs.appendFileSync('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [CONNECT] - " + 'Disconnected/removed from: ' + guild.name + ' (id: '+ guild.id + ').');
     };
   }
}
module.exports.commandFound = (message, command) => {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = global.client; // Prepare a client for the bot
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot

     if (config.loggingEnabled == "TRUE" && config.loggingCommand == "TRUE") {
       fs.appendFileSync('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -   - [COMMAND] - " + 'Command "' + command + '" was found successfully and used by ' + message.author.username + '. (ID: ' + message.author.id + ')');
     };
}
module.exports.commandNotFound = (message, command) => {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = global.client; // Prepare a client for the bot
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot

     if (config.loggingEnabled == "TRUE" && config.loggingCommand == "TRUE") {
       fs.appendFileSync('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) -   - [COMMAND] - " + 'Command "' + command + '" was not found, requested by ' + message.author.username + '. (ID: ' + message.author.id + ')');
     };
}
