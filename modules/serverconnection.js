module.exports = {
   join: function() {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = global.client; // Prepare a client for the bot
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot
     const sql = require("sqlite"); // SQL Database, requires the sqlite module

     console.log(`Joined server joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
     if (config.loggingEnabled == "TRUE" && config.loggingConnect == "TRUE") {
       fs.appendFileSync('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [CONNECT] - " + 'Joined server joined: ' + guild.name + ' (id: '+ guild.id + '). This guild has ' + guild.memberCount + ' members!');
     };
   }
}
module.exports = {
   leave: function() {
     const Discord = require("discord.js"); // Require Discord.js for app to run
     const client = global.client; // Prepare a client for the bot
     const fs = require("fs"); // Prepare file reading
     const config = require("../config.json"); // Require the config file for the bot
     const sql = require("sqlite"); // SQL Database, requires the sqlite module

     console.log(`Disconnected/removed from: ${guild.name} (id: ${guild.id})`);
     if (config.loggingEnabled == "TRUE" && config.loggingConnect == "TRUE") {
        fs.appendFileSync('./log.txt', '\n' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " (UTC) - * - [CONNECT] - " + 'Disconnected/removed from: ' + guild.name + ' (id: '+ guild.id + ').');
     };
   }
}
